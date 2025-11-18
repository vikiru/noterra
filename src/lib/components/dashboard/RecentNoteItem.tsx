import { Calendar, FileText } from 'lucide-react';
import type { Note } from '@/features/notes/types/notes';

type RecentNoteItemProps = {
  note: Note;
};

export function RecentNoteItem({ note }: RecentNoteItemProps) {
  return (
    <a
      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group"
      href={`/notes/${note.id}`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0 text-primary">
          <FileText className="h-4 w-4" />
        </div>
        <span className="font-medium truncate text-sm group-hover:text-primary transition-colors">
          {note.title || 'Untitled Note'}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
        <Calendar className="h-3 w-3" />
        {new Date(note.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </div>
    </a>
  );
}
