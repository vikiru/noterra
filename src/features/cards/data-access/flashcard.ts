'use server';
import { and, eq, sql } from 'drizzle-orm';
import type { Flashcard, FlashcardCreate } from '@/cards/types/flashcard';
import { db } from '@/db/index';
import { flashcardsTable, notesTable } from '@/db/schema';
import type { FlashcardSet } from '@/features/cards/types/flashcardSet';

export async function insertCard(card: FlashcardCreate): Promise<Flashcard> {
  const result: Flashcard[] = await db
    .insert(flashcardsTable)
    .values(card)
    .returning();
  return result[0];
}

export async function insertMultipleCards(
  cards: FlashcardCreate[],
): Promise<Flashcard[]> {
  const result: Flashcard[] = await db
    .insert(flashcardsTable)
    .values(cards)
    .returning();
  return result;
}

export async function removeCard(flashcardId: string): Promise<Flashcard> {
  const result: Flashcard[] = await db
    .delete(flashcardsTable)
    .where(eq(flashcardsTable.id, flashcardId))
    .returning();
  return result[0];
}

export async function findCardById(flashcardId: string): Promise<Flashcard> {
  const result: Flashcard[] = await db
    .select()
    .from(flashcardsTable)
    .where(eq(flashcardsTable.id, flashcardId))
    .limit(1);
  return result[0];
}

export async function findCardsByNoteId(noteId: string): Promise<Flashcard[]> {
  const result: Flashcard[] = await db
    .select()
    .from(flashcardsTable)
    .where(eq(flashcardsTable.noteId, noteId));
  return result;
}

export async function findCardsByUserId(userId: string): Promise<Flashcard[]> {
  const result: Flashcard[] = await db
    .select()
    .from(flashcardsTable)
    .where(eq(flashcardsTable.authorId, userId));
  return result;
}

export async function modifyCard(flashcard: Flashcard): Promise<Flashcard> {
  const result: Flashcard[] = await db
    .update(flashcardsTable)
    .set(flashcard)
    .where(eq(flashcardsTable.id, flashcard.id))
    .returning();
  return result[0];
}

export async function findCardSets(
  userId: string,
  publicOnly = false,
): Promise<FlashcardSet[]> {
  const result = await db
    .select({
      id: notesTable.id,
      title: notesTable.title,
      summary: notesTable.summary,
      keywords: notesTable.keywords,
      createdAt: notesTable.createdAt,
      updatedAt: notesTable.updatedAt,
      cardCount: sql<number>`COUNT(${flashcardsTable.id})`.as('card_count'),
    })
    .from(notesTable)
    .leftJoin(flashcardsTable, eq(flashcardsTable.noteId, notesTable.id))
    .where(
      publicOnly
        ? and(eq(notesTable.authorId, userId), eq(notesTable.public, true))
        : eq(notesTable.authorId, userId),
    )
    .groupBy(
      notesTable.id,
      notesTable.title,
      notesTable.summary,
      notesTable.keywords,
      notesTable.createdAt,
      notesTable.updatedAt,
    );

  return result;
}
