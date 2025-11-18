import { BookOpen, FileText } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/lib/components/ui/empty';

export function EmptyFlashcardsState() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Empty>
        <EmptyMedia>
          <BookOpen className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No flashcard sets found</EmptyTitle>
          <EmptyDescription>
            Get started by creating flashcards from your notes.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <a
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            href="/prompt"
          >
            <FileText className="mr-2 size-4" />
            Create Note
          </a>
        </EmptyContent>
      </Empty>
    </div>
  );
}
