import type { Note } from '@/features/notes/types/notes';

export type FlashcardSet = Pick<Note, 'id' | 'title' | 'summary' | 'keywords' | 'createdAt' | 'updatedAt'> & {
  cardCount: number;
};
