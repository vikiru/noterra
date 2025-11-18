import { findCardsByNoteId } from '@/features/cards/data-access/flashcard';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { EmptyNoteFlashcardsState } from './EmptyNoteFlashcardsState';
import { FlashcardPreviewCard } from './FlashcardPreviewCard';

type FlashcardListViewProps = {
  noteId: string;
};

export async function FlashcardListView({ noteId }: FlashcardListViewProps) {
  const cards = await findCardsByNoteId(noteId);

  if (cards.length === 0) {
    return <EmptyNoteFlashcardsState />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4">
        {cards.map((card) => (
          <FlashcardPreviewCard card={card} key={card.id} />
        ))}
      </div>
    </ScrollArea>
  );
}
