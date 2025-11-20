import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { FlashcardListView } from '@/features/cards/components/FlashcardListView';
import {
  findNoteByShareToken,
  findPublicCardsByNoteId,
} from '@/features/notes/data-access/notes';
import { Spinner } from '@/lib/components/ui/spinner';

export default async function SharedNoteFlashcardsPage({
  params,
}: {
  params: Promise<{ shareToken: string }>;
}) {
  const { shareToken } = await params;

  const note = await findNoteByShareToken(shareToken);

  if (!note || !note.shared || !note.showCards) {
    return notFound();
  }

  const cards = await findPublicCardsByNoteId(note.id);

  if (cards.length === 0) {
    return notFound();
  }

  return (
    <div className="container max-w-full py-8 px-4 sm:px-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <Button
            asChild
            className="-ml-3 text-muted-foreground hover:text-black w-fit"
            size="sm"
            variant="ghost"
          >
            <Link href={`/shared/${shareToken}`}>
              <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1 " />
              Back to note
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-foreground">
                {note.title}
              </h1>
              <p className="text-muted-foreground font-body text-lg max-w-2xl">
                Review the flashcards from this note.
              </p>
            </div>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center p-12">
              <Spinner />
            </div>
          }
        >
          <FlashcardListView noteId={note.id} showUserActions={false} />
        </Suspense>
      </div>
    </div>
  );
}
