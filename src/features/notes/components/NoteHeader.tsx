import { Globe, Lock } from 'lucide-react';
import { DateTime } from 'luxon';
import { Badge } from '@/components/ui/badge';
import type { Note } from '@/features/notes/types/notes';

type NoteHeaderProps = {
  note: Pick<Note, 'title' | 'createdAt' | 'public' | 'keywords'> & {
    author: { username: string; firstName: string; lastName: string };
  };
};

export function NoteHeader({ note }: NoteHeaderProps) {
  const authorName =
    note.author.firstName && note.author.lastName
      ? `${note.author.firstName} ${note.author.lastName}`
      : note.author.username;

  return (
    <section className="mb-2" id="note-header">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 font-heading">
        {note.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 font-body">
        <div>
          <span className="font-medium text-foreground">{authorName}</span>
          <span className="mx-2">•</span>
          <time dateTime={note.createdAt.toISOString()}>
            {DateTime.fromJSDate(note.createdAt).toFormat('LLL dd, yyyy')}
          </time>
        </div>
        <div className="flex items-center gap-1.5">
          {note.public ? (
            <Globe className="h-3.5 w-3.5" />
          ) : (
            <Lock className="h-3.5 w-3.5" />
          )}
          <span>{note.public ? 'Public' : 'Private'}</span>
        </div>
      </div>

      {note.keywords && note.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.keywords.map((kw: string) => (
            <Badge className="text-xs" key={kw.trim()} variant="secondary">
              {kw.trim()}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
