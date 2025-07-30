import type z from 'zod';
import type {
  insertFlashcardSchema,
  selectFlashcardSchema,
  updateFlashcardSchema,
} from '@/features/cards/schema/flashcardSchema';

export type Flashcard = z.infer<typeof selectFlashcardSchema>;
export type FlashcardCreate = z.infer<typeof insertFlashcardSchema>;
export type FlashcardUpdate = z.infer<typeof updateFlashcardSchema>;
