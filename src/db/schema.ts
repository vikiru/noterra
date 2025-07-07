import { relations } from 'drizzle-orm';
import {
    boolean,
    index,
    pgEnum,
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
} from 'drizzle-orm/pg-core';

// TODO: Perform migration with existing changes - activity creation (migration name). THEN ->
// TODO: Flashcards should be public/private from notes schema not flashcard.

export const usersTable = pgTable('users', {
    clerkId: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    bio: text('bio').notNull().default(''),
    country: text('country').notNull().default(''),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});

const activityAction = pgEnum('activity_action', [
    'create',
    'update',
    'delete',
]);
const activityType = pgEnum('activity_type', ['note', 'flashcard']);

export type ActivityAction = 'create' | 'delete' | 'update';
export type ActivityType = 'flashcard' | 'note';

export const userActivityTable = pgTable(
    'user_activity',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        userId: text('user_id')
            .notNull()
            .references(() => usersTable.clerkId, { onDelete: 'cascade' }),
        action: activityAction('action').notNull(),
        type: activityType('type').notNull(),
        entityId: uuid('entity_id').notNull(),
        createdAt: timestamp('created_at', { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (table) => {
        return [
            index('user_action_index').on(table.userId, table.action),
            index('user_time_index').on(table.userId, table.createdAt),
        ];
    },
);

export const notesTable = pgTable(
    'notes',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        authorId: text('author_id')
            .notNull()
            .references(() => usersTable.clerkId, { onDelete: 'cascade' }),
        title: text('title').notNull(),
        summary: text('summary').notNull(),
        keywords: text('keywords').notNull(),
        content: text('content').notNull(),
        shared: boolean('shared').notNull().default(false),
        public: boolean('public').notNull().default(false),
        shareToken: uuid('share_token').notNull().defaultRandom().unique(),
        createdAt: timestamp('created_at', { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        unique('author_title_unique').on(table.authorId, table.title),
        index('author_public_note_index').on(table.authorId, table.public),
        index('author_shared_note_index').on(table.authorId, table.shared),
        index('keyword_index').on(table.keywords),
    ],
);

export const flashcardsTable = pgTable(
    'flashcards',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        authorId: text('author_id')
            .notNull()
            .references(() => usersTable.clerkId, { onDelete: 'cascade' }),
        noteId: uuid('note_id')
            .notNull()
            .references(() => notesTable.id, { onDelete: 'cascade' }),
        question: text('question').notNull(),
        answer: text('answer').notNull(),
        public: boolean('public').notNull().default(false),
        createdAt: timestamp('created_at', { withTimezone: true })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        index('author_note_index').on(table.authorId, table.noteId),
        index('author_public_card_index').on(table.authorId, table.public),
        index('public_index').on(table.public),
    ],
);

export const userRelations = relations(usersTable, ({ many }) => ({
    notes: many(notesTable),
    flashcards: many(flashcardsTable),
    activity: many(userActivityTable),
}));

export const noteRelations = relations(notesTable, ({ one, many }) => ({
    author: one(usersTable, {
        fields: [notesTable.authorId],
        references: [usersTable.clerkId],
    }),
    flashcards: many(flashcardsTable),
}));

export const flashcardRelations = relations(flashcardsTable, ({ one }) => ({
    author: one(usersTable, {
        fields: [flashcardsTable.authorId],
        references: [usersTable.clerkId],
    }),
    note: one(notesTable, {
        fields: [flashcardsTable.noteId],
        references: [notesTable.id],
    }),
}));
