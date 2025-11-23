import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AddFlashcardButton } from '@/features/cards/components/AddFlashcardButton';
import { FlashcardListView } from '@/features/cards/components/FlashcardListView';
import { findCardsByNoteId } from '@/features/cards/data-access/flashcard';
import { findNoteTitleById } from '@/features/notes/data-access/notes';

export default async function NoteFlashcardsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noteTitle = await findNoteTitleById(id);

  if (!noteTitle) {
    return notFound();
  }

  const flashcards = await findCardsByNoteId(id);

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
            <Link href={`/notes/${id}`}>
              <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1 " />
              Back to Note
            </Link>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-foreground">
                {noteTitle.title}
              </h1>
              <p className="text-muted-foreground font-body text-lg max-w-2xl">
                Review and manage the flashcards generated from your note.
              </p>
            </div>
            <AddFlashcardButton currentCount={flashcards.length} noteId={id} />
          </div>
        </div>

        <FlashcardListView noteId={id} />
      </div>
    </div>
  );
}
