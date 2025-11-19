import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NoteMetadata } from '@/features/notes/types/noteMetadata';
import { EmptyNotesState } from '@/lib/components/dashboard/EmptyNotesState';
import { RecentNoteItem } from '@/lib/components/dashboard/RecentNoteItem';

type RecentNotesListProps = {
  recentNotes: NoteMetadata[];
};

export function RecentNotesList({ recentNotes }: RecentNotesListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Recent Notes</CardTitle>
        <a
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
          href="/notes"
        >
          View all <ArrowRight className="h-3 w-3" />
        </a>
      </CardHeader>
      <CardContent>
        {recentNotes.length === 0 ? (
          <EmptyNotesState />
        ) : (
          <div className="space-y-1">
            {recentNotes.map((note) => (
              <RecentNoteItem key={note.id} note={note} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
