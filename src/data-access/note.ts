import { and, eq } from 'drizzle-orm';
import * as z from 'zod';

import { db } from '@/db';
import { notesTable } from '@/db/schema';
import { noteSchema } from '@/schema/databaseSchema';
import { Note, NoteCreate, NoteUpdate } from '@/types/note';
import { Response } from '@/types/response';

// TODO: make sure to avoid all mentions of public fields.
// TODO: finish redoing responses to use Response type for all data-access fns.
export async function createNote(note: NoteCreate): Promise<Response<Note>> {
    try {
        const result = noteSchema.insert.safeParse(note);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid note data provided. Please try again with valid data.',
            };
        }
        const data = result.data;
        const newNote = await db
            .insert(notesTable)
            .values({
                authorId: data.authorId,
                title: data.title,
                content: data.content,
                summary: data.summary,
                keywords: data.keywords,
            })
            .returning();
        const createdNote = newNote[0];
        if (!createdNote) {
            return { success: false, error: 'Failed to create note' };
        }
        return { success: true, data: createdNote };
    } catch (error) {
        console.error(`Error creating note:`, error);
        return {
            success: false,
            error: 'An unexpected error occured during note creation. Please try again.',
        };
    }
}

export async function deleteNote(id: string): Promise<Response<string>> {
    try {
        const result = z.string().uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid note id provided. Please try again with a valid id.',
            };
        }
        const data = result.data;
        const deleted = await db
            .delete(notesTable)
            .where(eq(notesTable.id, data))
            .returning();
        const deletedNote = deleted[0];
        if (!deletedNote) {
            return { success: false, error: 'Failed to delete note' };
        }
        return { success: true, data: deletedNote.id };
    } catch (error) {
        console.error(`Error deleting note with id ${id}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured while deleting note. Please try again',
        };
    }
}

export async function retrieveNoteById(
    noteId: string,
): Promise<Response<Note>> {
    try {
        const result = z.string().uuid().safeParse(noteId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid note id provided. Please try again with a valid id.',
            };
        }

        const data = result.data;
        const note = await db
            .select()
            .from(notesTable)
            .where(eq(notesTable.id, data))
            .limit(1);

        const fetchedNote = note[0];
        if (!fetchedNote) {
            return {
                success: false,
                error: 'Note not found with the provided id, please try again with a valid id.',
            };
        }
        return { success: true, data: fetchedNote };
    } catch (error) {
        console.error(`Error getting note with id ${noteId}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured while fetching the note. Please try again.',
        };
    }
}

export async function retrieveNotesByUserId(
    authorId: string,
): Promise<Response<Note[]>> {
    try {
        const result = z.string().uuid().safeParse(authorId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const data = result.data;
        const notes = await db
            .select()
            .from(notesTable)
            .where(eq(notesTable.authorId, data));
        if (!notes) {
            return {
                success: false,
                error: 'No notes found with the provided user id, please try again with a valid id.',
            };
        }
        return { success: true, data: notes };
    } catch (error) {
        console.error(`Error getting notes with user id ${authorId}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured while fetching the notes. Please try again.',
        };
    }
}

export async function retrievePublicNotesByUserId(
    authorId: string,
): Promise<Response<Note[]>> {
    try {
        const result = z.uuid().safeParse(authorId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const data = result.data;
        const notes = await db
            .select()
            .from(notesTable)
            .where(
                and(eq(notesTable.authorId, data), eq(notesTable.public, true)),
            );

        if (!notes) {
            return { success: false, error: 'No notes found' };
        }

        return { success: true, data: notes };
    } catch (error) {
        console.error(
            `Error getting public notes with user id ${authorId}:`,
            error,
        );
        return {
            success: false,
            error: 'An unexpected error occured while fetching the notes. Please try again.',
        };
    }
}

export async function updateNote(updatedNote: NoteUpdate): Promise<Note> {
    try {
        const result = noteSchema.update.safeParse(updatedNote);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid note data provided. Please try again with valid data.',
            );
        }
        const data = result.data;
        const updated = await db
            .update(notesTable)
            .set({
                title: data.title,
                content: data.content,
                summary: data.summary,
                keywords: data.keywords,
            })
            .where(eq(notesTable.id, data.id))
            .returning();
        const note = updated[0];
        return note;
    } catch (error) {
        console.error(`Error updating note with id ${updatedNote.id}:`, error);
        throw error;
    }
}
