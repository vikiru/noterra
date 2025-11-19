import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { NoteMetadata } from '@/features/notes/types/noteMetadata';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { EmptyNotesState } from './EmptyNotesState';
import { NoteCard } from './NoteCard';

type NotesListProps = {
  notes: NoteMetadata[];
};

export function NotesList({ notes }: NotesListProps) {
  if (!notes.length) {
    return <EmptyNotesState />;
  }

  return (
    <div className="container max-w-full mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-foreground">
            Your Knowledge Hub
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-2xl">
            Organize, review, and master your learning journey
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto gap-2 mt-3 sm:mt-0">
          <Link className="justify-center sm:justify-start" href="/prompt">
            <Plus className="h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-17rem)] pr-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
