import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
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
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <NoteDetail
        note={note}
        showFlashcardButton={note.showCards}
        showUserActions={false}
      />
    </Suspense>
  );
}
