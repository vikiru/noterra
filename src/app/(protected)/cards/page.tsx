import { Suspense } from 'react';
import { FlashcardSetList } from '@/features/cards/components/FlashcardSetList';
import { Spinner } from '@/lib/components/ui/spinner';

export default function AllCardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-foreground">
            All Flashcards
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-2xl">
            Review and manage all your flashcard sets
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
