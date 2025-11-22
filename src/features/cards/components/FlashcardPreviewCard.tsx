import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlashcardActions } from '@/features/cards/components/FlashcardActions';
import type { Flashcard } from '@/features/cards/types/flashcard';

type FlashcardPreviewCardProps = {
  card: Flashcard;
  showUserActions?: boolean;
};

export function FlashcardPreviewCard({
  card,
  showUserActions = true,
}: FlashcardPreviewCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md border-border/50 h-full flex flex-col">
      {showUserActions && (
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 z-10">
          <FlashcardActions card={card} />
        </div>
      )}
      <CardHeader className="pb-3 border-b bg-muted/30 flex-none">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          Question
        </span>
        <CardTitle className="font-heading text-base font-medium leading-relaxed mt-1">
          {card.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grow flex flex-col">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
          Answer
        </span>
        <p className="font-body text-muted-foreground leading-relaxed grow">
          {card.answer}
        </p>
      </CardContent>
    </Card>
  );
}
