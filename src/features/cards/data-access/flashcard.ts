'use server';
import { eq } from 'drizzle-orm';
import type { Flashcard, FlashcardCreate } from '@/cards/types/flashcard';
import { db } from '@/db/index';
import { flashcardsTable } from '@/db/schema';

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
