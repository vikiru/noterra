import type * as z from 'zod/v4-mini';
import type { noteSchema } from '@/schema';

export type Note = Omit<z.infer<typeof noteSchema.select>, 'id' | 'authorId'>;
export type NoteCreate = z.infer<typeof noteSchema.insert>;
export type NoteUpdate = z.infer<typeof noteSchema.update>;
