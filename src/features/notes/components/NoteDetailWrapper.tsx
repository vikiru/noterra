import { notFound } from 'next/navigation';
import { findCardsByNoteId } from '@/features/cards/data-access/flashcard';
import { NoteDetail } from '@/features/notes/components/NoteDetail';
import { findNoteById } from '@/features/notes/data-access/notes';
import { getCurrentUser } from '@/lib/auth';

// TODO: clean this up, add card redirect. Proper loading, not found. mermaidjs render diagrams. Add author username to note.
export async function NoteDetailWrapper({ noteId }: { noteId: string }) {
  const userId = await getCurrentUser();
  const note = await findNoteById(noteId as string);
  const isAuthor = userId === note?.authorId;
  const cards = await findCardsByNoteId(noteId as string);

  if (!note) {
    return notFound();
  }

  return <NoteDetail note={note} />;
}
