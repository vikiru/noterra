import { findCardSets } from '@/features/cards/data-access/flashcard';
import { getCurrentUser } from '@/lib/auth';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { EmptyFlashcardsState } from './EmptyFlashcardsState';
import { FlashcardSetCard } from './FlashcardSetCard';

export async function FlashcardSetList() {
  const userId = await getCurrentUser();
  if (!userId) return null;

  const cardSets = await findCardSets(userId);

  if (!cardSets.length) {
    return <EmptyFlashcardsState />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-17rem)] pr-4">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-4">
        {cardSets.map((set) => (
          <FlashcardSetCard key={set.id} set={set} />
        ))}
      </div>
    </ScrollArea>
  );
}
