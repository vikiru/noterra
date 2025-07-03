import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Flashcard } from '@/types/flashcard';

// TODO: switch to Map, figure out how to seralize/deserialize.

type FlashcardState = {
    flashcards: Flashcard[];
    getFlashcards: () => Flashcard[];
    getFlashcardById: (publicFlashcardId: string) => Flashcard | undefined;
    getFlashcardsByNoteId: (publicNoteId: string) => Flashcard[];
    setFlashcards: (flashcards: Flashcard[]) => void;
    addFlashcard: (flashcard: Flashcard) => void;
    removeFlashcard: (flashcard: Flashcard) => void;
    updateFlashcard: (flashcard: Flashcard) => void;
    resetFlashcards: () => void;
};

export const useFlashcardStore = create<FlashcardState>()(
    persist(
        immer((set, get) => ({
            flashcards: [],
            getFlashcards: () => get().flashcards,
            getFlashcardById: (publicFlashcardId) =>
                get().flashcards.find(
                    (f) => f.publicFlashcardId === publicFlashcardId,
                ),
            getFlashcardsByNoteId: (publicNoteId) =>
                get().flashcards.filter((f) => f.publicNoteId === publicNoteId),
            setFlashcards: (flashcards) => {
                set((state) => {
                    state.flashcards = flashcards;
                });
            },
            addFlashcard: (flashcard) => {
                set((state) => {
                    state.flashcards.push(flashcard);
                });
            },
            removeFlashcard: (flashcard) => {
                set((state) => {
                    state.flashcards = state.flashcards.filter(
                        (f) =>
                            f.publicFlashcardId !== flashcard.publicFlashcardId,
                    );
                });
            },
            updateFlashcard: (flashcard) => {
                set((state) => {
                    const index = state.flashcards.findIndex(
                        (f) =>
                            f.publicFlashcardId === flashcard.publicFlashcardId,
                    );
                    if (index !== -1) {
                        state.flashcards[index] = flashcard;
                    }
                });
            },
            resetFlashcards: () => {
                set((state) => {
                    state.flashcards = [];
                });
            },
        })),
        {
            name: 'flashcard-storage',
        },
    ),
);
