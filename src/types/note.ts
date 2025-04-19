import { z } from 'zod';
import { noteSchema } from '@/schema';

export type Note = Omit<z.infer<typeof noteSchema.select>, 'id' | 'authorId'>;
export type NoteCreate = z.infer<typeof noteSchema.insert>;
export type NoteUpdate = z.infer<typeof noteSchema.update>;
