import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { flashcardsTable } from '@/lib/db/schema';

export const flashcardSchema = {
  select: createSelectSchema(flashcardsTable),
  update: createUpdateSchema(flashcardsTable).pick({
    id: true,
    authorId: true,
    noteId: true,
    question: true,
    answer: true,
    createdAt: true,
    updatedAt: true,
  }),
  insert: createInsertSchema(flashcardsTable).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
};

export const selectFlashcardSchema = createSelectSchema(flashcardsTable);
export const insertFlashcardSchema = createInsertSchema(flashcardsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertFlashcardArraySchema = insertFlashcardSchema.array();
export const updateFlashcardSchema = createUpdateSchema(flashcardsTable);
