import { z } from 'zod';
import { flashcardSchema } from '@/schema';

export type Flashcard = Omit<
    z.infer<typeof flashcardSchema.select>,
    'id' | 'authorId' | 'noteId'
>;

export type FlashcardCreate = z.infer<typeof flashcardSchema.insert>;
export type FlashcardUpdate = z.infer<typeof flashcardSchema.update>;
