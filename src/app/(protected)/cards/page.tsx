import type { Metadata } from 'next';
import { FlashcardSetList } from '@/features/cards/components/FlashcardSetList';

export const metadata: Metadata = {
  title: 'My Flashcards | Noterra',
  description: 'Review and manage all your flashcard sets',
};

export default function AllCardsPage() {
  return (
    <div className="container max-w-full mx-auto px-3 sm:px-4 py-6 sm:py-8">
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

      <FlashcardSetList />
    </div>
  );
}
