'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import type {
    Flashcard,
    FlashcardCreate,
    FlashcardUpdate,
} from '@/types/flashcard';

import {
    createCard,
    createMultipleCards,
    deleteCard,
    retrieveCardById,
    retrieveCardsByNoteId,
    retrieveCardsByUserId,
    retrievePublicCardsByNoteId,
    retrievePublicCardsByUserId,
    updateCard,
} from '@/data-access/card';

export async function addCard(card: FlashcardCreate): Promise<Flashcard> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const newCard = await createCard(card);
        return newCard;
    } catch (error) {
        console.error('Error adding card:', error);
        throw error;
    }
}

export async function addMultipleCards(
    cards: FlashcardCreate[],
): Promise<Flashcard[]> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const newCards = await createMultipleCards(cards);
        return newCards;
    } catch (error) {
        console.error('Error adding cards:', error);
        throw error;
    }
}

export async function fetchCardById(id: string): Promise<Flashcard> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const card = await retrieveCardById(id);
        return card;
    } catch (error) {
        console.error('Error fetching card by id:', error);
        throw error;
    }
}

export async function fetchCardsByNoteId(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const cards = await retrieveCardsByNoteId(id);
        return cards;
    } catch (error) {
        console.error('Error fetching cards by note id:', error);
        throw error;
    }
}

export async function fetchCardsByUserId(id: string): Promise<Flashcard[]> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const cards = await retrieveCardsByUserId(id);
        return cards;
    } catch (error) {
        console.error('Error fetching cards by user id:', error);
        throw error;
    }
}

export async function fetchPublicCardsByNoteId(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const cards = await retrievePublicCardsByNoteId(id);
        return cards;
    } catch (error) {
        console.error('Error fetching public cards by note id:', error);
        throw error;
    }
}

export async function fetchPublicCardsByUserId() {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const cards = await retrievePublicCardsByUserId(userId);
        return cards;
    } catch (error) {
        console.error('Error fetching public cards by user id:', error);
        throw error;
    }
}

export async function modifyCard(card: FlashcardUpdate): Promise<Flashcard> {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const updatedCard = await updateCard(card);
        return updatedCard;
    } catch (error) {
        console.error('Error modifying card:', error);
        throw error;
    }
}

export async function removeCard(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            redirect('/auth/login');
        }
        const deletedCard = await deleteCard(id);
        return deletedCard;
    } catch (error) {
        console.error('Error removing card:', error);
        throw error;
    }
}
