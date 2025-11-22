import { FileText, Plus } from 'lucide-react';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { NoteMetadata } from '@/features/notes/types/noteMetadata';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

type UserNotesListProps = {
  notes: NoteMetadata[];
  isOwnProfile: boolean;
  username: string;
};

export function UserNotesList({
  notes,
  isOwnProfile,
  username,
}: UserNotesListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notes</h3>
          <p className="text-sm text-muted-foreground">
            {isOwnProfile
              ? 'Collection of public notes and study materials'
              : 'Collection of public notes'}
          </p>
        </div>
        {isOwnProfile && (
          <Button className="gap-1 h-8" size="sm" variant="outline">
            <Plus className="h-3.5 w-3.5" />
            <span>New Note</span>
          </Button>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
          <div className="p-3 rounded-full bg-muted mb-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            {isOwnProfile ? 'No notes yet' : 'No public notes'}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            {isOwnProfile
              ? 'Create your first note to start building your knowledge base.'
              : 'This user has not shared any public notes yet.'}
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[500px] pr-4">
          <div className="flex flex-col gap-3">
            {notes.map((note) => (
              <Link
                href={`/${username}/notes/${note.id}`}
                key={note.id}
                prefetch={false}
              >
                <Card className="hover:bg-accent/10 transition-colors cursor-pointer border-border/50 p-3">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5 shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="text-sm font-medium text-black dark:text-white leading-tight">
                            {note.title}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {DateTime.fromJSDate(note.createdAt).toFormat(
                              'LLL dd, yyyy',
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {note.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {note.keywords.map((keyword) => (
                            <Badge
                              className="text-[11px] font-normal text-muted-foreground"
                              key={keyword}
                              variant="outline"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
