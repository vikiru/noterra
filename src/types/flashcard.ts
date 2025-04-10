import { z } from 'zod';
import { flashcardSchema } from '@/schema';

export type Flashcard = Omit<
    z.infer<typeof flashcardSchema.select>,
    'id' | 'authorId' | 'noteId'
>;
