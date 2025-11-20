import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import type { FlashcardSet } from '@/lib/db/schema';

type UserFlashcardsListProps = {
  flashcards: (FlashcardSet & { cardCount: number })[];
  isOwnProfile: boolean;
  username: string;
};

export function UserFlashcardsList({
  flashcards,
  isOwnProfile,
  username,
}: UserFlashcardsListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Flashcard Sets
          </h3>
          <p className="text-sm text-muted-foreground">
            Sets of flashcards created for study sessions
          </p>
        </div>
      </div>

      {flashcards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
          <div className="p-3 rounded-full bg-muted mb-3">
            <BookOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            {isOwnProfile ? 'No flashcards yet' : 'No public flashcards'}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            {isOwnProfile
              ? 'Generate flashcards from your notes to start studying.'
              : 'This user has not shared any public flashcards yet.'}
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {flashcards.map((set) => (
              <Link
                href={`/${username}/notes/${set.id}/flashcards`}
                key={set.id}
                prefetch={false}
              >
                <Card className="hover:bg-accent/10 transition-colors cursor-pointer border-border/50">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5 shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="text-sm font-medium text-black dark:text-white leading-tight">
                            {set.title}
                          </h4>
                          <Badge
                            className="text-xs font-normal text-muted-foreground bg-muted/50"
                            variant="secondary"
                          >
                            {set.cardCount} cards
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {set.summary}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
