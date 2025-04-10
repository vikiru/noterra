import { z } from 'zod';
import { noteSchema } from '@/schema';

export type Note = Omit<z.infer<typeof noteSchema.select>, 'id' | 'authorId'>;
