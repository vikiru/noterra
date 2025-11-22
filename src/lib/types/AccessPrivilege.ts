import type { Flashcard } from '@/features/cards/types/flashcard';
import type { Note } from '@/features/notes/types/notes';
import type { NoteData } from '@/lib/types/NoteData';

export type AccessPrivilege = {
  success: boolean;
  showCards: boolean;
  error?: string;
  data?: NoteData | Note | Flashcard;
};
