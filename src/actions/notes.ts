'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import type { Note, NoteCreate, NoteUpdate } from '@/types/note';

import {
    createNote,
    deleteNote,
    retrieveNoteById,
    retrieveNotesByUserId,
    retrievePublicNotesByUserId,
    updateNote,
} from '@/data-access/note';
import { ResponseData } from '@/types/response';

export async function addNote(note: NoteCreate): Promise<ResponseData<Note>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await createNote(note);
        return result;
    } catch (error) {
        console.error('Error adding note:', error);
        return { success: false, error: 'There was an error adding the note.' };
    }
}

export async function fetchNoteById(id: string): Promise<ResponseData<Note>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveNoteById(id);
        return result;
    } catch (error) {
        console.error(`Error fetching note by id, for id ${id}:`, error);
        return {
            success: false,
            error: 'There was an error fetching the note.',
        };
    }
}

export async function fetchNotesByUserId(): Promise<ResponseData<Note[]>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveNotesByUserId(userId);
        return result;
    } catch (error) {
        console.error('Error fetching notes:', error);
        return {
            success: false,
            error: 'There was an error fetching the notes.',
        };
    }
}

export async function fetchPublicNotesByUserId(): Promise<
    ResponseData<Note[]>
> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrievePublicNotesByUserId(userId);
        return result;
    } catch (error) {
        console.error('Error fetching public notes:', error);
        return {
            success: false,
            error: 'There was an error fetching the notes.',
        };
    }
}

export async function modifyNote(
    note: NoteUpdate,
): Promise<ResponseData<Note>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await updateNote(note);
        return result;
    } catch (error) {
        console.error('Error updating note:', error);
        return {
            success: false,
            error: 'There was an error updating the note.',
        };
    }
}

export async function removeNote(id: string): Promise<ResponseData<string>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await deleteNote(id);
        return result;
    } catch (error) {
        console.error(`Error removing note, for id ${id}:`, error);
        return {
            success: false,
            error: 'There was an error removing the note.',
        };
    }
}
