import { ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  findCardSets,
  findCardsByUserId,
} from '@/features/cards/data-access/flashcard';
import type { FlashcardSet } from '@/features/cards/types/flashcardSet';
import { getCurrentUser } from '@/lib/auth';

const getRandomColor = () => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-amber-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// TODO: remove the static text/fns, sep components.
// TODO: create /notes/id/cards page to show cards for a note, update the links to point to that.
// TODO: create fn to fetch note id, description, title, flashcard count.
// TODO: create review page to review cards.

export default async function AllCardsPage() {
  const userId = await getCurrentUser();
  const cardSets = await findCardSets(userId as string);

  if (!cardSets.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No flashcard sets found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by creating flashcards from your notes.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/notes">
              View Notes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Flashcards</h1>
          <p className="text-muted-foreground mt-2">
            Review and study your flashcard collections
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cardSets.map((set: FlashcardSet) => (
          <div className="group relative flex flex-col h-full" key={set.id}>
            <Card className="relative flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 hover:shadow-md">
              <div className="flex flex-col flex-1 p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
                        {set.title}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
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
                      <Clock className="mr-1.5 h-4 w-4 shrink-0" />
                      <span className="text-xs">
                        {new Date(set.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="group/button relative h-8 text-xs"
                      size="sm"
                      variant="outline"
                    >
                      <Link href={`/notes/${set.id}/flashcards`}>
                        Study
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
