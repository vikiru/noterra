import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { flashcardsTable } from '@/lib/db/schema';

export const selectFlashcardSchema = createSelectSchema(flashcardsTable);
export const insertFlashcardSchema = createInsertSchema(flashcardsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertFlashcardArraySchema = insertFlashcardSchema.array();
export const updateFlashcardSchema = createUpdateSchema(flashcardsTable);
