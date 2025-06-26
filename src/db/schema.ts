import { relations } from 'drizzle-orm';
import {
    boolean,
    index,
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
} from 'drizzle-orm/pg-core';

// TODO: add user logs / activity table. For now track note/flashcard create/update/delete. Ideally keep track of 7d activity only.
// TODO: keep track of daily prompt usage through this

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
        index('title_index').on(table.title),
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
