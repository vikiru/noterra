import type * as z from 'zod/v4';
import type { flashcardSchema } from '@/schema';

export type Flashcard = Omit<
    z.infer<typeof flashcardSchema.select>,
    'id' | 'authorId' | 'noteId'
>;

export type FlashcardCreate = z.infer<typeof flashcardSchema.insert>;
export type FlashcardUpdate = z.infer<typeof flashcardSchema.update>;
