'use server';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { SIGNIN_ROUTE } from '@/constants/route';
import { findNoteWithCardsById } from '@/features/notes/data-access/notes';
import type { AccessPrivilege } from '@/lib/types/accessPrivilege';

export const getCurrentUser = cache(async function getCurrentUser() {
  try {
    const { userId } = await auth();
    if (!userId) {
      redirect(SIGNIN_ROUTE);
    }
    return userId;
  } catch (error) {
    console.error('Error fetching user info from Clerk:', error);
    redirect(SIGNIN_ROUTE);
  }
});

export async function checkOwnership(
  resourceOwnerId: string,
): Promise<boolean> {
  const userId = await getCurrentUser();
  return userId === resourceOwnerId;
}

// TODO: clean this up once frontend user flows are finished. Sep notes and flashcard handling. (if showcards add redirect to flashcard details for this note)
export async function checkAccessPrivileges(
  noteId: string,
): Promise<AccessPrivilege> {
  const { note, flashcards } = await findNoteWithCardsById(noteId);
  if (!note) {
    return {
      success: false,
      showCards: false,
      error: 'Note not found',
    };
  }

  if (note.public) {
    return {
      success: true,
      showCards: note.showCards,
      data: { note, flashcards: note.showCards ? flashcards : [] },
    };
  }

  const userId = await getCurrentUser();

  if (userId === note.authorId) {
    return {
      success: true,
      showCards: note.showCards,
      data: { note, flashcards },
    };
  }

  if (note.shared) {
    return {
      success: true,
      showCards: note.showCards,
      data: { note, flashcards: note.showCards ? flashcards : [] },
    };
  }

  return {
    success: false,
    showCards: false,
    error: 'Access denied',
  };
}
