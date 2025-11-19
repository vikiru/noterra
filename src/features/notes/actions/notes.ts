'use server';

import { revalidatePath } from 'next/cache';
import {
  findNoteById,
  findNoteWithAuthorById,
  insertNote,
  removeNote,
  updateNote,
  updateNoteVisibility,
} from '@/features/notes/data-access/notes';
import { insertNoteSchema } from '@/features/notes/schema/noteSchema';
import { checkOwnership } from '@/lib/auth';
import { validateData } from '@/lib/utils/validateData';
import type { Note, NoteCreate } from '@/notes/types/notes';

export async function createNote(note: NoteCreate) {
  try {
    const isOwner = await checkOwnership(note.authorId);
    if (!isOwner) {
      return {
        success: false,
        error: "You don't have permission to create this note.",
      };
    }

    const result = validateData(note, insertNoteSchema);
    if (!result.success) return result;

    const newNote = await insertNote(result.data);
    return { success: true, data: newNote };
  } catch (error) {
    console.error('Error creating note:', error);
    return {
      success: false,
      error: 'Unexpected error occurred while creating note.',
    };
  }
}

export async function updateNoteAction(updatedNote: Note) {
  try {
    const existing = await findNoteById(updatedNote.id);
    if (!existing) {
      return { success: false, error: 'Note not found.' };
    }
    const isOwner = await checkOwnership(existing.authorId);
    if (!isOwner) {
      return { success: false, error: 'Access denied.' };
    }
    await updateNote(updatedNote);
    revalidatePath(`/notes/${updatedNote.id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating note:', error);
    return {
      success: false,
      error: 'Unexpected error occurred while updating note.',
    };
  }
}

export async function deleteNote(noteId: string) {
  try {
    const existing = await findNoteById(noteId);
    if (!existing) {
      return { success: false, error: 'Note not found.' };
    }
    const isOwner = await checkOwnership(existing.authorId);
    if (!isOwner) {
      return { success: false, error: 'Access denied.' };
    }
    await removeNote(noteId);
    revalidatePath('/notes');
    return { success: true };
  } catch (error) {
    console.error('Error deleting note:', error);
    return {
      success: false,
      error: 'Unexpected error occurred while deleting note.',
    };
  }
}

export async function updateNoteVisibilityAction(
  noteId: string,
  visibility: { public: boolean; shared: boolean; showCards: boolean },
) {
  try {
    const existing = await findNoteWithAuthorById(noteId);
    if (!existing) {
      return { success: false, error: 'Note not found.' };
    }
    const isOwner = await checkOwnership(existing.authorId);
    if (!isOwner) {
      return { success: false, error: 'Access denied.' };
    }

    const updatedNote = await updateNoteVisibility(noteId, visibility);

    revalidatePath(`/notes/${noteId}`);

    if (updatedNote.public || existing.public) {
      revalidatePath(`/${existing.author.username}/notes/${noteId}`);
    }

    if (updatedNote.shared || existing.shared) {
      revalidatePath(`/shared/${existing.shareToken}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating note visibility:', error);
    return {
      success: false,
      error: 'Unexpected error occurred while updating visibility.',
    };
  }
}
