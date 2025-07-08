import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Note } from '@/types/note';

type NoteState = {
    notes: Map<string, Note>;
    getNotes: () => Map<string, Note>;
    getNoteById: (noteId: string) => Note | undefined;
    getNotesByUserId: (authorId: string) => Note[];
    getPublicNotesByUserId: (authorId: string) => Note[];
    setNotes: (notes: Map<string, Note>) => void;
    addNote: (note: Note) => void;
    removeNote: (noteId: string) => void;
    updateNote: (note: Note) => void;
    resetNotes: () => void;
};

export const useNoteStore = create<NoteState>()(
    persist(
        immer((set, get) => ({
            notes: new Map<string, Note>(),
            getNotes: () => get().notes,
            getNoteById: (noteId: string) => get().notes.get(noteId),
            getNotesByUserId: (authorId) =>
                Array.from(
                    get()
                        .notes.values()
                        .filter((note) => note.authorId === authorId),
                ),
            getPublicNotesByUserId: (authorId) =>
                Array.from(
                    get()
                        .notes.values()
                        .filter(
                            (note) => note.authorId === authorId && note.public,
                        ),
                ),
            setNotes: (notes) => {
                set((state) => {
                    state.notes = notes;
                });
            },
            addNote: (note) => {
                set((state) => {
                    state.notes.set(note.id, note);
                });
            },
            removeNote: (noteId) => {
                set((state) => {
                    state.notes.delete(noteId);
                });
            },
            updateNote: (note) => {
                set((state) => {
                    if (state.notes.has(note.id))
                        state.notes.set(note.id, note);
                });
            },
            resetNotes: () => {
                set((state) => {
                    state.notes = new Map<string, Note>();
                });
            },
        })),
        {
            name: 'note-storage',
        },
    ),
);
