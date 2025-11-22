import { and, desc, eq, getTableColumns } from 'drizzle-orm';
import type { Flashcard } from '@/cards/types/flashcard';
import { db } from '@/db/index';
import { flashcardsTable, notesTable, usersTable } from '@/db/schema';
import type { NoteEditorData } from '@/features/editor/types/NoteEditorData';
import type { NoteMetadata } from '@/features/notes/types/noteMetadata';
import type { NoteData } from '@/lib/types/NoteData';
import type { Note, NoteCreate } from '@/notes/types/notes';

export async function insertNote(note: NoteCreate): Promise<Note> {
  const result: Note[] = await db.insert(notesTable).values(note).returning();
  return result[0];
}

export async function removeNote(noteId: string): Promise<Note> {
  const result: Note[] = await db
    .delete(notesTable)
    .where(eq(notesTable.id, noteId))
    .returning();
  return result[0];
}

export async function findNoteById(noteId: string): Promise<Note | null> {
  const result: Note[] = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.id, noteId))
    .limit(1);
  return result[0] ?? null;
}

export async function findNoteTitleById(
  noteId: string,
): Promise<{ title: string } | null> {
  const result = await db
    .select({ title: notesTable.title })
    .from(notesTable)
    .where(eq(notesTable.id, noteId))
    .limit(1);
  return result[0] ?? null;
}

export async function findNoteWithAuthorById(noteId: string): Promise<
  | (Note & {
      author: { username: string; firstName: string; lastName: string };
    })
  | null
> {
  const result = await db
    .select({
      ...getTableColumns(notesTable),
      authorUsername: usersTable.username,
      authorFirstName: usersTable.firstName,
      authorLastName: usersTable.lastName,
    })
    .from(notesTable)
    .innerJoin(usersTable, eq(notesTable.authorId, usersTable.clerkId))
    .where(eq(notesTable.id, noteId))
    .limit(1);

  if (!result[0]) return null;

  const { authorUsername, authorFirstName, authorLastName, ...noteData } =
    result[0];
  return {
    ...noteData,
    author: {
      username: authorUsername,
      firstName: authorFirstName,
      lastName: authorLastName,
    },
  };
}

export async function findNoteWithCardsById(noteId: string): Promise<NoteData> {
  const result = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.id, noteId));
  const note = result[0] ?? null;
  if (!note) {
    return {
      note,
      flashcards: [],
    };
  }
  const flashcards = await db
    .select()
    .from(flashcardsTable)
    .where(eq(flashcardsTable.noteId, noteId));

  return {
    note,
    flashcards,
  };
}

export async function findNotesByUserId(userId: string): Promise<Note[]> {
  const result: Note[] = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.authorId, userId));
  return result;
}

export async function findNoteByShareToken(shareToken: string): Promise<
  | (Note & {
      author: { username: string; firstName: string; lastName: string };
    })
  | null
> {
  const result = await db
    .select({
      ...getTableColumns(notesTable),
      authorUsername: usersTable.username,
      authorFirstName: usersTable.firstName,
      authorLastName: usersTable.lastName,
    })
    .from(notesTable)
    .innerJoin(usersTable, eq(notesTable.authorId, usersTable.clerkId))
    .where(eq(notesTable.shareToken, shareToken))
    .limit(1);

  if (!result[0]) return null;

  const { authorUsername, authorFirstName, authorLastName, ...noteData } =
    result[0];
  return {
    ...noteData,
    author: {
      username: authorUsername,
      firstName: authorFirstName,
      lastName: authorLastName,
    },
  };
}

export async function findPublicCardsByNoteId(
  noteId: string,
): Promise<Flashcard[]> {
  const result: Flashcard[] = await db
    .select({
      id: flashcardsTable.id,
      authorId: flashcardsTable.authorId,
      noteId: flashcardsTable.noteId,
      question: flashcardsTable.question,
      answer: flashcardsTable.answer,
      createdAt: flashcardsTable.createdAt,
      updatedAt: flashcardsTable.updatedAt,
    })
    .from(notesTable)
    .innerJoin(flashcardsTable, eq(notesTable.id, flashcardsTable.noteId))
    .where(and(eq(notesTable.id, noteId), eq(notesTable.showCards, true)));

  return result;
}

export async function findPublicNotesByUserId(
  userId: string,
): Promise<NoteMetadata[]> {
  const result: NoteMetadata[] = await db
    .select({
      id: notesTable.id,
      authorId: notesTable.authorId,
      title: notesTable.title,
      summary: notesTable.summary,
      keywords: notesTable.keywords,
      shared: notesTable.shared,
      public: notesTable.public,
      createdAt: notesTable.createdAt,
    })
    .from(notesTable)
    .where(and(eq(notesTable.authorId, userId), eq(notesTable.public, true)));
  return result;
}

export async function updateNote(updatedNote: Note): Promise<Note> {
  const result = await db
    .update(notesTable)
    .set({
      title: updatedNote.title,
      summary: updatedNote.summary,
      keywords: updatedNote.keywords,
      content: updatedNote.content,
      public: updatedNote.public,
      shared: updatedNote.shared,
      showCards: updatedNote.showCards,
    })
    .where(eq(notesTable.id, updatedNote.id))
    .returning();
  return result[0];
}

export async function updateNoteVisibility(
  noteId: string,
  visibility: { public: boolean; shared: boolean; showCards: boolean },
): Promise<Note> {
  const result = await db
    .update(notesTable)
    .set({
      public: visibility.public,
      shared: visibility.shared,
      showCards: visibility.showCards,
    })
    .where(eq(notesTable.id, noteId))
    .returning();
  return result[0];
}

export async function findRecentUserNotes(
  userId: string,
): Promise<NoteMetadata[]> {
  const result: NoteMetadata[] = await db
    .select({
      id: notesTable.id,
      authorId: notesTable.authorId,
      title: notesTable.title,
      summary: notesTable.summary,
      keywords: notesTable.keywords,
      shared: notesTable.shared,
      public: notesTable.public,
      createdAt: notesTable.createdAt,
    })
    .from(notesTable)
    .where(eq(notesTable.authorId, userId))
    .orderBy(desc(notesTable.createdAt))
    .limit(10);
  return result;
}

export async function findNoteMetadata(
  userId: string,
): Promise<NoteMetadata[]> {
  const result: NoteMetadata[] = await db
    .select({
      id: notesTable.id,
      createdAt: notesTable.createdAt,
      authorId: notesTable.authorId,
      title: notesTable.title,
      summary: notesTable.summary,
      keywords: notesTable.keywords,
      public: notesTable.public,
      shared: notesTable.shared,
      showCards: notesTable.showCards,
      shareToken: notesTable.shareToken,
    })
    .from(notesTable)
    .where(eq(notesTable.authorId, userId))
    .orderBy(desc(notesTable.createdAt));
  return result;
}

export async function findNoteTitles(
  userId: string,
): Promise<{ id: string; title: string }[]> {
  const result = await db
    .select({
      id: notesTable.id,
      title: notesTable.title,
    })
    .from(notesTable)
    .where(eq(notesTable.authorId, userId));
  return result;
}

export async function findNoteForEditing(
  noteId: string,
): Promise<NoteEditorData | null> {
  const result = await db
    .select({
      id: notesTable.id,
      title: notesTable.title,
      summary: notesTable.summary,
      keywords: notesTable.keywords,
      content: notesTable.content,
      public: notesTable.public,
      shared: notesTable.shared,
      showCards: notesTable.showCards,
    })
    .from(notesTable)
    .where(eq(notesTable.id, noteId))
    .limit(1);

  return result[0] ?? null;
}

export async function updateNoteFromEditor(
  updatedNote: NoteEditorData,
): Promise<NoteEditorData> {
  const result = await db
    .update(notesTable)
    .set({
      title: updatedNote.title,
      summary: updatedNote.summary,
      keywords: updatedNote.keywords,
      content: updatedNote.content,
      public: updatedNote.public,
      shared: updatedNote.shared,
      showCards: updatedNote.showCards,
    })
    .where(eq(notesTable.id, updatedNote.id))
    .returning({
      id: notesTable.id,
      title: notesTable.title,
      summary: notesTable.summary,
      keywords: notesTable.keywords,
      content: notesTable.content,
      public: notesTable.public,
      shared: notesTable.shared,
      showCards: notesTable.showCards,
    });
  return result[0];
}
