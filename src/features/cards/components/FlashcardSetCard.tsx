import { ArrowRight, Clock } from 'lucide-react';
import { DateTime } from 'luxon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { FlashcardSet } from '@/features/cards/types/flashcardSet';

type FlashcardSetCardProps = {
  set: FlashcardSet;
};

export function FlashcardSetCard({ set }: FlashcardSetCardProps) {
  return (
    <div className="group relative flex flex-col h-full">
      <Card className="relative flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 hover:shadow-md">
        <div className="flex flex-col flex-1 p-6">
          <CardHeader className="p-0 pb-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold leading-tight line-clamp-2 font-heading">
                  {set.title}
                </CardTitle>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 font-body">
                  {set.summary}
                </p>
              </div>
              <Badge
                className="shrink-0 ml-2 border-primary/20 bg-primary/5 text-xs font-medium h-6"
                variant="outline"
              >
                {set.cardCount} {set.cardCount === 1 ? 'card' : 'cards'}
              </Badge>
            </div>
          </CardHeader>

          <div className="mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1.5 size-3 shrink-0" />
                <span className="text-xs">
                  {DateTime.fromJSDate(set.createdAt).toFormat('LLL dd, yyyy')}
                </span>
              </div>
              <Button
                asChild
                className="group/button relative h-8 text-xs"
                size="sm"
                variant="outline"
              >
                <a href={`/notes/${set.id}/flashcards`}>
                  Study
                  <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover/button:translate-x-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
