import type { Flashcard } from '@/features/cards/types/flashcard';
import type { Note } from '@/features/notes/types/notes';
import type { NoteData } from '@/lib/types/noteData';

export type AccessPrivelege = {
  success: boolean;
  showCards: boolean;
  error?: string;
  data?: NoteData | Note | Flashcard;
};
