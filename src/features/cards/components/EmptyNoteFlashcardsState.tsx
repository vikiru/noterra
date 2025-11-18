import { BookOpen } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/lib/components/ui/empty';

export function EmptyNoteFlashcardsState() {
  return (
    <div className="py-12">
      <Empty>
        <EmptyMedia>
          <BookOpen className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No flashcards yet</EmptyTitle>
          <EmptyDescription>
            Create your first flashcard to start studying this note
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
