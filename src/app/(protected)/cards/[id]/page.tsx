import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { findCardById } from '@/features/cards/data-access/flashcard';
import { getCurrentUser } from '@/lib/auth';

export default async function CardDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getCurrentUser();
  const { id } = await params;
  const flashcard = await findCardById(id);

  if (!flashcard) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Flashcard Details</CardTitle>
          <p className="text-muted-foreground text-sm">ID: {id}</p>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
              Question
            </h3>
            <p className="text-muted-foreground">{flashcard.question}</p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
              Answer
            </h3>
            <p className="text-muted-foreground">{flashcard.answer}</p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">Note ID</Badge>
            <span className="text-sm text-muted-foreground">
              {flashcard.noteId}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Created: {flashcard.createdAt.toLocaleDateString()}</span>
            <span>Updated: {flashcard.updatedAt.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
