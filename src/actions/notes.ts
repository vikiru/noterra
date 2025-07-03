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

export async function addNote(note: NoteCreate): Promise<Note> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const newNote = await createNote(note);
        return newNote;
    } catch (error) {
        console.error('Error adding note:', error);
        throw error;
    }
}

export async function fetchNoteById(id: string): Promise<Note> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const note = await retrieveNoteById(id);
        return note;
    } catch (error) {
        console.error(`Error fetching note by id, for id ${id}:`, error);
        throw error;
    }
}

export async function fetchNotesByUserId(): Promise<Note[]> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const notes = await retrieveNotesByUserId(userId);
        return notes;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

export async function fetchPublicNotesByUserId(): Promise<Note[]> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const notes = await retrievePublicNotesByUserId(userId);
        return notes;
    } catch (error) {
        console.error('Error fetching public notes:', error);
        throw error;
    }
}

export async function modifyNote(note: NoteUpdate): Promise<Note> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const updatedNote = await updateNote(note);
        return updatedNote;
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

export async function removeNote(id: string): Promise<Note> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const deletedNote = await deleteNote(id);
        return deletedNote;
    } catch (error) {
        console.error(`Error removing note, for id ${id}:`, error);
        throw error;
    }
}
