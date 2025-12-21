import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { notesTable } from '@/lib/db/schema';

export const selectNoteSchema = createSelectSchema(notesTable);
export const insertNoteSchema = createInsertSchema(notesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  shareToken: true,
});
export const updateNoteSchema = createUpdateSchema(notesTable);
