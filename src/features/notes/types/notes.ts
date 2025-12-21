import type z from 'zod';
import type { insertNoteSchema, selectNoteSchema, updateNoteSchema } from '@/features/notes/schema/noteSchema';

export type Note = z.infer<typeof selectNoteSchema>;
export type NoteCreate = z.infer<typeof insertNoteSchema>;
export type NoteUpdate = z.infer<typeof updateNoteSchema>;
