import { Globe, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Note } from '@/lib/db/schema';

interface NoteHeaderProps {
  note: Pick<Note, 'title' | 'createdAt' | 'public' | 'keywords'>;
}

export function NoteHeader({ note }: NoteHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 font-heading">
        {note.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 font-body">
        <div>
          <time dateTime={note.createdAt.toISOString()}>
            {note.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
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
          {note.keywords.map((kw) => (
            <Badge className="text-xs" key={kw.trim()} variant="secondary">
              {kw.trim()}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
