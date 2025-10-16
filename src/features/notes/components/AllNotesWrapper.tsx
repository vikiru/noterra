import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { findNotesByUserId } from '@/features/notes/data-access/notes';
import { getCurrentUser } from '@/lib/auth';

export async function AllNotesWrapper() {
  const userId = await getCurrentUser();
  const notes = await findNotesByUserId(userId as string);

  if (!notes.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center text-muted-foreground">
        <p>No notes found. Start by creating one!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Your Notes</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <Link
            className="block"
            href={`/notes/${note.id}`}
            key={note.id}
            prefetch={false}
          >
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg">{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>{note.summary || 'No summary provided.'}</p>
                <div className="flex flex-wrap gap-2">
                  {note.keywords
                    .split(',')
                    .slice(0, 3)
                    .map((kw) => (
                      <Badge key={kw.trim()} variant="outline">
                        {kw.trim()}
                      </Badge>
                    ))}
                </div>
                <div className="text-xs mt-2 flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>{note.public ? '🌐 Public' : '🔒 Private'}</span>
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
