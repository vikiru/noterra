'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
    createCard,
    createMultipleCards,
    deleteCard,
    retrieveCardById,
    retrieveCardsByNoteId,
    retrieveCardsByUserId,
    retrievePublicCardsByUserId,
    updateCard,
} from '@/data-access/card';
import { retrievePublicCardsByNoteId } from '@/data-access/note';
import type {
    Flashcard,
    FlashcardCreate,
    FlashcardUpdate,
} from '@/types/flashcard';
import type { ResponseData } from '@/types/response';

export async function addCard(
    card: FlashcardCreate,
): Promise<ResponseData<Flashcard>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await createCard(card);
        return result;
    } catch (error) {
        console.error('Error adding card:', error);
        return {
            success: false,
            error: 'There was an error adding the card.',
        };
    }
}

export async function addMultipleCards(
    cards: FlashcardCreate[],
): Promise<ResponseData<Flashcard[]>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await createMultipleCards(cards);
        return result;
    } catch (error) {
        console.error('Error adding cards:', error);
        return {
            success: false,
            error: 'There was an error adding the cards.',
        };
    }
}

export async function fetchCardById(
    id: string,
): Promise<ResponseData<Flashcard>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveCardById(id);
        return result;
    } catch (error) {
        console.error('Error fetching card by id:', error);
        return {
            success: false,
            error: 'There was an error fetching the card.',
        };
    }
}

export async function fetchCardsByNoteId(
    id: string,
): Promise<ResponseData<Flashcard[]>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveCardsByNoteId(id);
        return result;
    } catch (error) {
        console.error('Error fetching cards by note id:', error);
        return {
            success: false,
            error: 'There was an error fetching the cards.',
        };
    }
}

export async function fetchCardsByUserId(
    id: string,
): Promise<ResponseData<Flashcard[]>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrieveCardsByUserId(id);
        return result;
    } catch (error) {
        console.error('Error fetching cards by user id:', error);
        return {
            success: false,
            error: 'There was an error fetching the cards.',
        };
    }
}

// TODO: move this to note, after refac schema
export async function fetchPublicCardsByNoteId(
    id: string,
): Promise<ResponseData<Flashcard[]>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrievePublicCardsByNoteId(id);
        return result;
    } catch (error) {
        console.error('Error fetching public cards by note id:', error);
        return {
            success: false,
            error: 'There was an error fetching the cards.',
        };
    }
}

export async function fetchPublicCardsByUserId(): Promise<
    ResponseData<Flashcard[]>
> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await retrievePublicCardsByUserId(userId);
        return result;
    } catch (error) {
        console.error('Error fetching public cards by user id:', error);
        return {
            success: false,
            error: 'There was an error fetching the cards.',
        };
    }
}

export async function modifyCard(
    card: FlashcardUpdate,
): Promise<ResponseData<Flashcard>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await updateCard(card);
        return result;
    } catch (error) {
        console.error('Error modifying card:', error);
        return {
            success: false,
            error: 'There was an error modifying the card.',
        };
    }
}

export async function removeCard(id: string): Promise<ResponseData<string>> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const result = await deleteCard(id);
        return result;
    } catch (error) {
        console.error('Error removing card:', error);
        return {
            success: false,
            error: 'There was an error removing the card.',
        };
    }
}
