'use client';

import {
  ChevronDown,
  Eye,
  FileDown,
  FileText,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNoteExport } from '@/features/export/hooks/useNoteExport';
import { useNoteDelete } from '@/features/notes/hooks/useNoteDelete';
import { Separator } from '@/lib/components/ui/separator';

type NoteExportMenuProps = {
  noteId: string;
  title: string;
  content: string;
  contentRef: RefObject<HTMLDivElement | null>;
  showFlashcardButton?: boolean;
  showUserActions?: boolean;
};

export function NoteExportMenu({
  noteId,
  title,
  content,
  contentRef,
  showFlashcardButton = false,
  showUserActions = false,
}: NoteExportMenuProps) {
  const pathname = usePathname();
  const flashcardsLink = `${pathname}/flashcards`;

  const { convertToMarkdown, convertToText, convertToPDF } = useNoteExport({
    title,
    content,
    contentRef,
  });
  const { onDelete } = useNoteDelete({ noteId });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {showUserActions ? (
          <Button size="sm" variant={'ghost'}>
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        ) : (
          <Button size="sm" variant={'outline'}>
            <div className="px-2 flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </div>
            <Separator className="h-2 bg-black" orientation="vertical" />
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={convertToMarkdown}
        >
          <FileDown className="mr-2 h-4 w-4" />
          <span>Export as Markdown</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={convertToText}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={convertToPDF}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
        {showFlashcardButton && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={flashcardsLink}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View Flashcards</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {showUserActions && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Note</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
