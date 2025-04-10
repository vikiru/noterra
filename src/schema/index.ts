import { flashcardsTable, notesTable, usersTable } from '@/db/schema';
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';

export const userSchema = {
    select: createSelectSchema(usersTable),
    update: createUpdateSchema(usersTable),
    insert: createInsertSchema(usersTable),
};

export const noteSchema = {
    select: createSelectSchema(notesTable),
    update: createUpdateSchema(notesTable),
    insert: createInsertSchema(notesTable),
};

export const flashcardSchema = {
    select: createSelectSchema(flashcardsTable),
    update: createUpdateSchema(flashcardsTable),
    insert: createInsertSchema(flashcardsTable),
};
