import { notFound } from 'next/navigation';
import { NoteDetail } from '@/features/notes/components/NoteDetail';
import { findNoteWithAuthorById } from '@/features/notes/data-access/notes';

export default async function PublicNotePage({
  params,
}: {
  params: Promise<{ username: string; noteId: string }>;
}) {
  const { noteId } = await params;

  const note = await findNoteWithAuthorById(noteId);

  if (!note || !note.public) {
    return notFound();
  }

  return (
    <NoteDetail
      note={note}
      showFlashcardButton={note.showCards}
      showUserActions={false}
    />
  );
}
