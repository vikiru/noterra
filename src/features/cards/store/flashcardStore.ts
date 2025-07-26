import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Flashcard } from '@/cards/types/flashcard';

type FlashcardState = {
  flashcards: Map<string, Flashcard>;
  getFlashcards: () => Map<string, Flashcard>;
  getFlashcardById: (flashcardId: string) => Flashcard | undefined;
  getFlashcardsByNoteId: (noteId: string) => Flashcard[];
  setFlashcards: (flashcards: Map<string, Flashcard>) => void;
  addFlashcard: (flashcard: Flashcard) => void;
  removeFlashcard: (flashcard: Flashcard) => void;
  updateFlashcard: (flashcard: Flashcard) => void;
  resetFlashcards: () => void;
};

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    immer((set, get) => ({
      flashcards: new Map<string, Flashcard>(),
      getFlashcards: () => get().flashcards,
      getFlashcardById: (flashcardId) => get().flashcards.get(flashcardId),
      getFlashcardsByNoteId: (noteId) =>
        Array.from(
          get()
            .flashcards.values()
            .filter((f) => f.noteId === noteId),
        ),
      setFlashcards: (flashcards) => {
        set((state) => {
          state.flashcards = flashcards;
        });
      },
      addFlashcard: (flashcard) => {
        set((state) => {
          state.flashcards.set(flashcard.id, flashcard);
        });
      },
      removeFlashcard: (flashcard) => {
        set((state) => {
          state.flashcards.delete(flashcard.id);
        });
      },
      updateFlashcard: (flashcard) => {
        set((state) => {
          if (state.flashcards.has(flashcard.id))
            state.flashcards.set(flashcard.id, flashcard);
        });
      },
      resetFlashcards: () => {
        set((state) => {
          state.flashcards = new Map<string, Flashcard>();
        });
      },
    })),
    {
      name: 'flashcard-storage',
    },
  ),
);
