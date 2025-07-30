import { and, eq } from 'drizzle-orm';
import type { Flashcard } from '@/cards/types/flashcard';
import { db } from '@/db/index';
import { flashcardsTable, notesTable } from '@/db/schema';
import type { NoteData } from '@/lib/types/noteData';
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

export async function findNoteByShareToken(shareToken: string): Promise<Note> {
  const result: Note[] = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.shareToken, shareToken))
    .limit(1);
  return result[0];
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

export async function findPublicNotesByUserId(userId: string): Promise<Note[]> {
  const result: Note[] = await db
    .select()
    .from(notesTable)
    .where(
      and(eq(notesTable.authorId, userId), eq(notesTable.showCards, true)),
    );
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
