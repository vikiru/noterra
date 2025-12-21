import { notFound } from 'next/navigation';
import { NoteDetail } from '@/features/notes/components/NoteDetail';
import { findNoteByShareToken } from '@/features/notes/data-access/notes';

export default async function SharedNotePage({ params }: { params: Promise<{ shareToken: string }> }) {
  const { shareToken } = await params;

  const note = await findNoteByShareToken(shareToken);

  if (!(note && note.shared)) {
    return notFound();
  }

  return <NoteDetail note={note} showFlashcardButton={note.showCards} showUserActions={false} />;
}
