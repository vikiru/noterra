import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';
import * as z from 'zod';

import {
    flashcardsTable,
    notesTable,
    userActivityTable,
    usersTable,
} from '@/db/schema';

export const userSchema = {
    select: createSelectSchema(usersTable),
    update: createUpdateSchema(usersTable)
        .pick({
            firstName: true,
            lastName: true,
            bio: true,
            country: true,
        })
        .partial()
        .extend({
            clerkId: z.string().uuid(),
        }),
    insert: createInsertSchema(usersTable).omit({
        createdAt: true,
        updatedAt: true,
    }),
};

export const activitySchema = {
    select: createSelectSchema(userActivityTable),
    update: createUpdateSchema(userActivityTable),
    insert: createInsertSchema(userActivityTable).omit({
        id: true,
        createdAt: true,
    }),
};

export const noteSchema = {
    select: createSelectSchema(notesTable),
    update: createUpdateSchema(notesTable)
        .pick({
            title: true,
            content: true,
            public: true,
            shared: true,
            showCards: true,
            keywords: true,
            summary: true,
        })
        .partial()
        .extend({
            id: z.string().uuid(),
            authorId: z.string().uuid(),
        }),
    insert: createInsertSchema(notesTable).omit({
        id: true,
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
        })
        .partial()
        .extend({
            id: z.string().uuid(),
            noteId: z.string().uuid(),
        }),
    insert: createInsertSchema(flashcardsTable).omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    }),
};
