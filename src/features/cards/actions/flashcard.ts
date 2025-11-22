'use server';

import { revalidatePath } from 'next/cache';
import type { Flashcard, FlashcardCreate } from '@/cards/types/flashcard';
import { MAX_FLASHCARDS_PER_NOTE } from '@/features/cards/constants';
import {
  findCardById,
  findCardsByNoteId,
  insertCard,
  insertMultipleCards,
  modifyCard,
  removeCard,
} from '@/features/cards/data-access/flashcard';
import {
  insertFlashcardArraySchema,
  insertFlashcardSchema,
  selectFlashcardSchema,
} from '@/features/cards/schema/flashcardSchema';
import { checkOwnership } from '@/lib/auth';
import { validateData } from '@/lib/utils/validateData';

export async function createFlashcard(card: FlashcardCreate) {
  try {
    const isOwner = await checkOwnership(card.authorId);
    if (!isOwner) {
      return {
        success: false,
        error: "You don't have permission to create this flashcard.",
      };
    }

    const existingCards = await findCardsByNoteId(card.noteId);
    if (existingCards.length >= MAX_FLASHCARDS_PER_NOTE) {
      return {
        success: false,
        error: `Maximum limit of ${MAX_FLASHCARDS_PER_NOTE} flashcards per note reached.`,
      };
    }

    const result = validateData<FlashcardCreate>(card, insertFlashcardSchema);
    if (!result.success) return result;
    const newCard = await insertCard(result.data);
    revalidatePath(`/notes/${card.noteId}/flashcards`);
    return { success: true, data: newCard };
  } catch (err) {
    console.error('Error creating flashcard:', err);
    return {
      success: false,
      error: 'Unexpected error occurred during flashcard creation.',
    };
  }
}

export async function createMultipleFlashcards(cards: FlashcardCreate[]) {
  try {
    if (cards.length === 0) {
      return { success: false, error: 'No cards provided.' };
    }

    const firstAuthorId = cards[0].authorId;
    const isOwner = await checkOwnership(firstAuthorId);
    if (!isOwner) {
      return {
        success: false,
        error: "You don't have permission to create these flashcards.",
      };
    }

    const result = validateData<FlashcardCreate[]>(
      cards,
      insertFlashcardArraySchema,
    );
    if (!result.success) return result;

    const created = await insertMultipleCards(result.data);
    return { success: true, data: created };
  } catch (err) {
    console.error('Error creating multiple flashcards:', err);
    return {
      success: false,
      error: 'Unexpected error occurred while creating flashcards.',
    };
  }
}

export async function updateFlashcard(updatedCard: Flashcard) {
  try {
    const existing = await findCardById(updatedCard.id);
    if (!existing) {
      return { success: false, error: 'Flashcard not found.' };
    }

    const isOwner = await checkOwnership(existing.authorId);
    if (!isOwner) {
      return { success: false, error: 'Access denied.' };
    }

    const result = validateData<Flashcard>(updatedCard, selectFlashcardSchema);
    if (!result.success) return result;

    const saved = await modifyCard(result.data);
    revalidatePath(`/notes/${updatedCard.noteId}/flashcards`);
    return { success: true, data: saved };
  } catch (err) {
    console.error('Error updating flashcard:', err);
    return {
      success: false,
      error: 'Unexpected error occurred during flashcard update.',
    };
  }
}

export async function deleteFlashcard(flashcardId: string) {
  try {
    const existing = await findCardById(flashcardId);
    if (!existing) {
      return { success: false, error: 'Flashcard not found.' };
    }

    const isOwner = await checkOwnership(existing.authorId);
    if (!isOwner) {
      return { success: false, error: 'Access denied.' };
    }

    const deleted = await removeCard(flashcardId);
    revalidatePath(`/notes/${existing.noteId}/flashcards`);
    return { success: true, data: deleted };
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    return {
      success: false,
      error: 'Unexpected error occurred during flashcard deletion.',
    };
  }
}
