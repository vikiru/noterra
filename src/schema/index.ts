import { flashcardsTable, notesTable, usersTable } from '@/db/schema';
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

export const userSchema = {
    select: createSelectSchema(usersTable),
    update: createUpdateSchema(usersTable)
        .pick({
            name: true,
            profileImage: true,
            bio: true,
            country: true,
        })
        .extend({
            clerkId: z.string().uuid(),
            publicId: z.string().uuid(),
        }),
    insert: createInsertSchema(usersTable).omit({
        createdAt: true,
        updatedAt: true,
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
            keywords: true,
            summary: true,
        })
        .extend({
            id: z.string().uuid(),
            authorId: z.string().uuid(),
            publicNoteId: z.string().uuid(),
            publicAuthorId: z.string().uuid(),
            shareToken: z.string().uuid(),
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
            id: z.string().uuid(),
            authorId: z.string().uuid(),
            noteId: z.string().uuid(),
            publicAuthorId: z.string().uuid(),
            publicNoteId: z.string().uuid(),
        }),
    insert: createInsertSchema(flashcardsTable).omit({
        id: true,
        publicFlashcardId: true,
        createdAt: true,
        updatedAt: true,
    }),
};
