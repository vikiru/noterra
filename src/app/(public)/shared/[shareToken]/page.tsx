import { Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { findNoteByShareToken } from '@/features/notes/data-access/notes';
import { NoteDetail } from '@/features/notes/components/NoteDetail';

export default async function SharedNotePage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;
  
  const note = await findNoteByShareToken(shareToken);

  if (!note || !note.shared) {
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
        showUserActions={false} 
        showFlashcardButton={note.showCards}
      />
    </Suspense>
  );
}
