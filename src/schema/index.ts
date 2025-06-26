import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';
import * as z from 'zod/v4';
import { flashcardsTable, notesTable, usersTable } from '@/db/schema';

export const userSchema = {
    select: createSelectSchema(usersTable),
    update: createUpdateSchema(usersTable)
        .pick({
            firstName: true,
            lastName: true,
            bio: true,
            country: true,
        })
        .extend({
            clerkId: z.uuid(),
        }),
    insert: createInsertSchema(usersTable).omit({
        createdAt: true,
        updatedAt: true,
    }),
};

// TODO: Redo these schemas, fix ts errors.

export const noteSchema = {
    select: createSelectSchema(notesTable),
    update: createUpdateSchema(notesTable)
        .pick({
            title: true,
            content: true,
            public: true,
            shared: true,
            keywords: true,
            summary: true,
        })
        .extend({
            id: z.uuid(),
            authorId: z.uuid(),
            shareToken: z.uuid(),
        }),
    insert: createInsertSchema(notesTable).omit({
        id: true,
        publicNoteId: true,
        createdAt: true,
        updatedAt: true,
        shareToken: true,
    }),
};

export const flashcardSchema = {
    select: createSelectSchema(flashcardsTable),
    update: createUpdateSchema(flashcardsTable)
        .pick({
            question: true,
            answer: true,
            public: true,
        })
        .extend({
            id: z.uuid(),
            authorId: z.uuid(),
            noteId: z.uuid(),
        }),
    insert: createInsertSchema(flashcardsTable).omit({
        id: true,
        publicFlashcardId: true,
        createdAt: true,
        updatedAt: true,
    }),
};
