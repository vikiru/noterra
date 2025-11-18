import Link from 'next/link';
import { FileText } from 'lucide-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/lib/components/ui/empty';

export function EmptyNotesState() {
  return (
    <div className="py-6">
      <Empty>
        <EmptyMedia>
          <FileText className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No notes yet</EmptyTitle>
          <EmptyDescription>
            Get started by creating your first AI-generated note.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link
            href="/prompt"
            className="text-primary hover:underline font-medium"
          >
            Create Note
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  );
}
