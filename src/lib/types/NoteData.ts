import type { Flashcard } from '@/features/cards/types/flashcard';
import type { Note } from '@/features/notes/types/notes';

export type NoteData = {
  note: Note | null;
  flashcards: Flashcard[];
};
