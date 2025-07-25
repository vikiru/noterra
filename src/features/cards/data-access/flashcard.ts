import { and, eq } from 'drizzle-orm';
import * as z from 'zod/v4';
import { db } from '@/db';
import { flashcardsTable } from '@/db/schema';
import { flashcardSchema } from '@/schema/databaseSchema';
import type {
    Flashcard,
    FlashcardCreate,
    FlashcardUpdate,
} from '@/types/flashcard';
import type { ResponseData } from '@/types/response';

export async function createCard(
    card: FlashcardCreate,
): Promise<ResponseData<Flashcard>> {
    try {
        const result = flashcardSchema.insert.safeParse(card);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid flashcard data provided. Please try again with valid data.',
            };
        }
        const validatedFlashcard = result.data;
        const newCard = await db
            .insert(flashcardsTable)
            .values({
                authorId: validatedFlashcard.authorId,
                noteId: validatedFlashcard.noteId,
                question: validatedFlashcard.question,
                answer: validatedFlashcard.answer,
            })
            .returning();
        const flashcard = newCard[0];
        if (!flashcard) {
            return { success: false, error: 'Failed to create flashcard.' };
        }
        return { success: true, data: flashcard };
    } catch (error) {
        console.error(`Error creating flashcard:`, error);
        return {
            success: false,
            error: 'An unexpected error occured during flashcard creation. Please try again.',
        };
    }
}

export async function createMultipleCards(
    cards: FlashcardCreate[],
): Promise<ResponseData<Flashcard[]>> {
    try {
        const result = flashcardSchema.insert.array().safeParse(cards);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid flashcard data provided. Please try again with valid data.',
            };
        }
        const validatedCards = result.data;
        const newCards = await db
            .insert(flashcardsTable)
            .values(validatedCards)
            .returning();
        if (!newCards) {
            return { success: false, error: 'Failed to create flashcards.' };
        }
        return { success: true, data: newCards };
    } catch (error) {
        console.error('Error creating flashcards:', error);
        return {
            success: false,
            error: 'An unexpected error occured during flashcard creation. Please try again.',
        };
    }
}

export async function deleteCard(id: string): Promise<ResponseData<string>> {
    try {
        const result = z.uuid().safeParse(id);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid flashcard id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const deleted = await db
            .delete(flashcardsTable)
            .where(eq(flashcardsTable.id, validatedId))
            .returning();
        const deletedCard = deleted[0];
        if (!deletedCard) {
            return { success: false, error: 'Failed to delete flashcard.' };
        }
        return { success: true, data: deletedCard.id };
    } catch (error) {
        console.error(`Error deleting flashcard with id ${id}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured during flashcard deletion. Please try again.',
        };
    }
}

export async function retrieveCardById(
    cardId: string,
): Promise<ResponseData<Flashcard>> {
    try {
        const result = z.uuid().safeParse(cardId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid flashcard id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const card = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.id, validatedId))
            .limit(1);
        const retrievedCard = card[0];
        if (!retrievedCard) {
            return { success: false, error: 'Failed to retrieve flashcard.' };
        }
        return { success: true, data: retrievedCard };
    } catch (error) {
        console.error(`Error getting card with id ${cardId}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured during flashcard retrieval. Please try again.',
        };
    }
}

export async function retrieveCardsByNoteId(
    noteId: string,
): Promise<ResponseData<Flashcard[]>> {
    try {
        const result = z.uuid().safeParse(noteId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid note id provided. Please try again with a valid id.',
            };
        }
        const validatedId = result.data;
        const cards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.id, validatedId));
        if (!cards) {
            return { success: false, error: 'Failed to retrieve flashcards.' };
        }
        return { success: true, data: cards };
    } catch (error) {
        console.error(`Error getting cards with note id ${noteId}:`, error);
        throw error;
    }
}

export async function retrieveCardsByUserId(
    authorId: string,
): Promise<ResponseData<Flashcard[]>> {
    try {
        const result = z.uuid().safeParse(authorId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const data = result.data;
        const cards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.authorId, data));
        if (!cards) {
            return { success: false, error: 'Failed to retrieve flashcards.' };
        }
        return { success: true, data: cards };
    } catch (error) {
        console.error(`Error getting cards with user id ${authorId}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured during flashcard retrieval. Please try again.',
        };
    }
}

export async function retrievePublicCardsByUserId(
    authorId: string,
): Promise<ResponseData<Flashcard[]>> {
    try {
        const result = z.uuid().safeParse(authorId);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid user id provided. Please try again with a valid id.',
            };
        }
        const data = result.data;
        const cards = await db
            .select()
            .from(flashcardsTable)
            .where(eq(flashcardsTable.authorId, data));
        if (cards.length === 0) {
            return { success: false, error: 'Failed to retrieve flashcards.' };
        }
        return { success: true, data: cards };
    } catch (error) {
        console.error(`Error getting cards with user id ${authorId}:`, error);
        return {
            success: false,
            error: 'An unexpected error occured during flashcard retrieval. Please try again.',
        };
    }
}

export async function updateCard(
    updatedCard: FlashcardUpdate,
): Promise<ResponseData<Flashcard>> {
    try {
        const result = flashcardSchema.update.safeParse(updatedCard);
        if (!result.success) {
            console.error(result.error);
            return {
                success: false,
                error: 'Invalid flashcard data provided. Please try again with valid data.',
            };
        }
        const validatedCard = result.data;
        const updated = await db
            .update(flashcardsTable)
            .set({
                question: validatedCard.question,
                answer: validatedCard.answer,
            })
            .where(eq(flashcardsTable.id, validatedCard.id))
            .returning();
        const flashcard = updated[0];
        if (!flashcard) {
            return { success: false, error: 'Failed to update flashcard.' };
        }
        return { success: true, data: flashcard };
    } catch (error) {
        console.error(
            `Error updating flashcard with id ${updatedCard.id}:`,
            error,
        );
        return {
            success: false,
            error: 'An unexpected error occured during flashcard update. Please try again.',
        };
    }
}
