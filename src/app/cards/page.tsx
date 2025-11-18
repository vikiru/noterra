import { Suspense } from 'react';
import { FlashcardSetList } from '@/features/cards/components/FlashcardSetList';
import { Spinner } from '@/lib/components/ui/spinner';

export default function AllCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-heading">
            Your Flashcards
          </h1>
          <p className="text-muted-foreground mt-2 font-body">
            Review and study your flashcard collections
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center p-12">
            <Spinner />
          </div>
        }
      >
        <FlashcardSetList />
      </Suspense>
    </div>
  );
}
