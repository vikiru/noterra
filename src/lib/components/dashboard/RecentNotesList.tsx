import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { NoteMetadata } from '@/features/notes/types/noteMetadata';
import { EmptyNotesState } from '@/lib/components/dashboard/EmptyNotesState';
import { RecentNoteItem } from '@/lib/components/dashboard/RecentNoteItem';
import { Button } from '@/lib/components/ui/button';

type RecentNotesListProps = {
  recentNotes: NoteMetadata[];
};

export function RecentNotesList({ recentNotes }: RecentNotesListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Recent Notes</CardTitle>
        <Link href="/notes">
          <Button variant="ghost">
            View all <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
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
