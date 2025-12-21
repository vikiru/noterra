import { EmptyNoteFlashcardsState } from '@/features/cards/components/EmptyNoteFlashcardsState';
import { FlashcardPreviewCard } from '@/features/cards/components/FlashcardPreviewCard';
import { findCardsByNoteId } from '@/features/cards/data-access/flashcard';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

type FlashcardListViewProps = {
  noteId: string;
  showUserActions?: boolean;
};

export async function FlashcardListView({ noteId, showUserActions = true }: FlashcardListViewProps) {
  const cards = await findCardsByNoteId(noteId);

  if (cards.length === 0) {
    return <EmptyNoteFlashcardsState />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4">
        {cards.map((card) => (
          <FlashcardPreviewCard card={card} key={card.id} showUserActions={showUserActions} />
        ))}
      </div>
    </ScrollArea>
  );
}
