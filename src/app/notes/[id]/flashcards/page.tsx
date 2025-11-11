// src/app/notes/[id]/flashcards/page.tsx

import { ArrowLeft, BookOpen, Plus } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { findCardsByNoteId } from '@/features/cards/data-access/flashcard';
import { findNoteById } from '@/features/notes/data-access/notes';
import { getCurrentUser } from '@/lib/auth';

export default async function NoteFlashcardsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  const cards = await findCardsByNoteId(params.id);

  return (
    <div className="container max-w-8xl py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <Link
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-1"
              href={`/notes/${params.id}`}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to note
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {cards.length} {cards.length === 1 ? 'card' : 'cards'} in this set
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link
              className="flex items-center"
              href={`/notes/${params.id}/flashcards/new`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Card
            </Link>
          </Button>
        </div>

        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-muted/20">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No flashcards yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create your first flashcard to start studying this note
            </p>
            <Button asChild>
              <Link
                className="flex items-center"
                href={`/notes/${params.id}/flashcards/new`}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <Card
                className="overflow-hidden transition-all hover:shadow-md"
                key={card.id}
              >
                <CardHeader>
                  <CardTitle>{card.question}</CardTitle>
                </CardHeader>
                <CardContent>{card.answer}</CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
