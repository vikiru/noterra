import { db } from '@/db';
import { notesTable } from '@/db/schema';
import { noteSchema } from '@/schema';
import { Note, NoteCreate, NoteUpdate } from '@/types/note';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export async function createNote(note: NoteCreate): Promise<Note> {
    try {
        const result = noteSchema.insert.safeParse(note);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid note data provided. Please try again with valid data.',
            );
        }
        const data = result.data;
        const newNote = await db
            .insert(notesTable)
            .values({
                authorId: data.authorId,
                publicAuthorId: data.publicAuthorId,
                title: data.title,
                content: data.content,
                summary: data.summary,
                keywords: data.keywords,
            })
            .returning();
        return newNote;
    } catch (error) {
        console.error(`Error creating note:`, error);
        throw error;
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

export async function deleteNote(id: string): Promise<Note> {
    try {
        const result = z.string().uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid note id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const deleted = await db
            .delete(notesTable)
            .where(eq(notesTable.id, data))
            .returning();
        const note = deleted[0];
        return note;
    } catch (error) {
        console.error(`Error deleting note with id ${id}:`, error);
        throw error;
    }
}

export async function retrieveNotesByUserId(
    publicAuthorId: string,
): Promise<Note[]> {
    try {
        const result = z.string().uuid().safeParse(publicAuthorId);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const notes = await db
            .select()
            .from(notesTable)
            .where(eq(notesTable.publicAuthorId, data));
        return notes;
    } catch (error) {
        console.error(
            `Error getting notes with user id ${publicAuthorId}:`,
            error,
        );
        throw error;
    }
}

export async function retrievePublicNotesByUserId(
    publicAuthorId: string,
): Promise<Note[]> {
    try {
        const result = z.string().uuid().safeParse(publicAuthorId);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const notes = await db
            .select()
            .from(notesTable)
            .where(
                and(
                    eq(notesTable.publicAuthorId, data),
                    eq(notesTable.public, true),
                ),
            );
        return notes;
    } catch (error) {
        console.error(
            `Error getting public notes with user id ${publicAuthorId}:`,
            error,
        );
        throw error;
    }
}

export async function retrieveNoteById(publicNoteId: string): Promise<Note> {
    try {
        const result = z.string().uuid().safeParse(publicNoteId);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid note id provided. Please try again with a valid id.',
            );
        }

        const data = result.data;
        const note = await db
            .select()
            .from(notesTable)
            .where(eq(notesTable.id, data))
            .limit(1);

        if (!note[0]) {
            throw new Error(`No note found with id: ${data}`);
        }

        return note[0];
    } catch (error) {
        console.error(`Error getting note with id ${publicNoteId}:`, error);
        throw error;
    }
}
