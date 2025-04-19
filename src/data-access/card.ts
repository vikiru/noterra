import { db } from '@/db';
import { flashcardsTable } from '@/db/schema';
import { flashcardSchema } from '@/schema';
import { FlashcardCreate, FlashcardUpdate } from '@/types/flashcard';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function createCard(card: FlashcardCreate) {
    try {
        const result = flashcardSchema.insert.safeParse(card);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid flashcard data provided. Please try again with valid data.',
            );
        }
        const data = result.data;
        const newCard = await db
            .insert(flashcardsTable)
            .values({
                authorId: data.authorId,
                noteId: data.noteId,
                publicAuthorId: data.publicAuthorId,
                publicNoteId: data.publicNoteId,
                question: data.question,
                answer: data.answer,
            })
            .returning();
        const flashcard = newCard[0];
        return flashcard;
    } catch (error) {
        console.error(`Error creating flashcard:`, error);
        throw error;
    }
}

export async function updateCard(updatedCard: FlashcardUpdate) {
    try {
        const result = flashcardSchema.update.safeParse(updatedCard);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid flashcard data provided. Please try again with valid data.',
            );
        }
        const data = result.data;
        const updated = await db
            .update(flashcardsTable)
            .set({
                question: data.question,
                answer: data.answer,
            })
            .where(eq(flashcardsTable.id, data.id))
            .returning();
        const flashcard = updated[0];
        return flashcard;
    } catch (error) {
        console.error(
            `Error updating flashcard with id ${updatedCard.id}:`,
            error,
        );
        throw error;
    }
}

export async function deleteCard(id: string) {
    try {
        const result = z.string().uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid flashcard id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const deleted = await db
            .delete(flashcardsTable)
            .where(eq(flashcardsTable.id, data))
            .returning();
        const flashcard = deleted[0];
        return flashcard;
    } catch (error) {
        console.error(`Error deleting flashcard with id ${id}:`, error);
        throw error;
    }
}

export async function getCardsByUserId(publicAuthorId: string) {
    try {
        const result = z.string().uuid().safeParse(publicAuthorId);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid user id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const cards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.publicAuthorId, data));
        return cards;
    } catch (error) {
        console.error(
            `Error getting cards with user id ${publicAuthorId}:`,
            error,
        );
        throw error;
    }
}

export async function getCardsByNoteId(publicNoteId: string) {
    try {
        const result = z.string().uuid().safeParse(publicNoteId);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid note id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const cards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.publicNoteId, data));
        return cards;
    } catch (error) {
        console.error(
            `Error getting cards with note id ${publicNoteId}:`,
            error,
        );
        throw error;
    }
}

export async function getCardById(publicCardId: string) {
    try {
        const result = z.string().uuid().safeParse(publicCardId);
        if (!result.success) {
            console.error(result.error);
            throw new Error(
                'Invalid card id provided. Please try again with a valid id.',
            );
        }
        const data = result.data;
        const card = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.id, data));
        return card;
    } catch (error) {
        console.error(`Error getting card with id ${publicCardId}:`, error);
        throw error;
    }
}
