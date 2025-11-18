import { ArrowLeft, Plus } from 'lucide-react';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { FlashcardListView } from '@/features/cards/components/FlashcardListView';
import { Spinner } from '@/lib/components/ui/spinner';

export default async function NoteFlashcardsPage({
  params,
}: {
  params: { id: string };
}) {
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
            <a href={`/notes/${params.id}`}>
              <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1 " />
              Back to note
            </a>
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight font-heading">
                Flashcards
              </h1>
              <p className="text-muted-foreground font-body max-w-2xl">
                Review and manage the flashcards generated from your note.
              </p>
            </div>
            <Button asChild className="w-full sm:w-auto shadow-sm">
              <a
                className="flex items-center justify-center"
                href={`/notes/${params.id}/flashcards/new`}
              >
                <Plus className="mr-2 size-4" />
                Add New Card
              </a>
            </Button>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center p-12">
              <Spinner />
            </div>
          }
        >
          <FlashcardListView noteId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
