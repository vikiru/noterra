import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { findCardsByUserId } from '@/features/cards/data-access/flashcard';
import { getCurrentUser } from '@/lib/auth';

export default async function AllCardsPage() {
  const userId = await getCurrentUser();
  const cards = await findCardsByUserId(userId as string);

  if (!cards.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center text-muted-foreground">
        <p>No flashcards found. Start creating some!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Flashcards</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            className="block hover:shadow-md transition-shadow"
            href={`/cards/${card.id}`}
            key={card.id}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{card.question}</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="text-sm text-muted-foreground">
                <p>Created: {new Date(card.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(card.updatedAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
