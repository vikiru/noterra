import { FileText, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';

export function EmptyNotesState() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <Empty>
        <EmptyMedia>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No notes yet</EmptyTitle>
          <EmptyDescription>Get started by creating your first note</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link className="gap-2" href="/prompt">
              <Plus className="h-4 w-4" />
              New Note
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
