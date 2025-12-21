import { notFound } from 'next/navigation';
import { NoteDetail } from '@/features/notes/components/NoteDetail';
import { findNoteWithAuthorById } from '@/features/notes/data-access/notes';

export default async function NoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await findNoteWithAuthorById(id as string);

  if (!note) {
    return notFound();
  }

  return <NoteDetail note={note} showFlashcardButton={true} showUserActions={true} />;
}
