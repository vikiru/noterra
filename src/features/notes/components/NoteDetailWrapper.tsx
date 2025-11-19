import { notFound } from 'next/navigation';
import { NoteDetail } from '@/features/notes/components/NoteDetail';
import { findNoteById } from '@/features/notes/data-access/notes';

export async function NoteDetailWrapper({ noteId }: { noteId: string }) {
  const note = await findNoteById(noteId as string);

  if (!note) {
    return notFound();
  }

  return <NoteDetail note={note} />;
}
