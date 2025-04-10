import { Note } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type NoteState = {
    notes: Note[];
    getNotes: () => Note[];
    getNoteById: (publicNoteId: string) => Note | undefined;
    getNotesByUserId: (publicAuthorId: string) => Note[];
    getPublicNotesByUserId: (publicAuthorId: string) => Note[];
    setNotes: (notes: Note[]) => void;
    addNote: (note: Note | any) => void;
    removeNote: (publicNoteId: string) => void;
    updateNote: (note: Note) => void;
    resetNotes: () => void;
};

export const useNoteStore = create<NoteState>()(
    persist(
        immer((set, get) => ({
            notes: [],
            getNotes: () => get().notes,
            getNoteById: (publicNoteId) =>
                get().notes.find((note) => note.publicNoteId === publicNoteId),
            getNotesByUserId: (publicAuthorId) =>
                get().notes.filter(
                    (note) => note.publicAuthorId === publicAuthorId,
                ),
            getPublicNotesByUserId: (publicAuthorId) =>
                get().notes.filter(
                    (note) =>
                        note.publicAuthorId === publicAuthorId && note.public,
                ),
            setNotes: (notes) => {
                set((state) => {
                    state.notes = notes;
                });
            },
            addNote: (note) => {
                set((state) => {
                    state.notes.push(note);
                });
            },
            removeNote: (publicNoteId) => {
                set((state) => {
                    state.notes = state.notes.filter(
                        (note) => note.publicNoteId !== publicNoteId,
                    );
                });
            },
            updateNote: (note) => {
                set((state) => {
                    const index = state.notes.findIndex(
                        (n) => n.publicNoteId === note.publicNoteId,
                    );
                    if (index !== -1) {
                        state.notes[index] = note;
                    }
                });
            },
            resetNotes: () => {
                set((state) => {
                    state.notes = [];
                });
            },
        })),
        {
            name: 'note-storage',
        },
    ),
);
