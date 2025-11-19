'use client';

import {
  ArrowLeft,
  Book,
  Edit,
  FileDown,
  FileText,
  MoreVertical,
  Share2,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NoteActionsProps {
  noteId: string;
  onExportMarkdown: () => void;
  onExportText: () => void;
  onExportPDF: () => void;
}

export function NoteActions({
  noteId,
  onExportMarkdown,
  onExportText,
  onExportPDF,
}: NoteActionsProps) {
  return (
    <section className="flex justify-between items-center mb-6" id="actions">
      <Button
        asChild
        className="-ml-3 text-muted-foreground hover:text-black"
        size="sm"
        variant="ghost"
      >
        <Link className="flex items-center gap-2" href="/notes">
          <ArrowLeft className="h-4 w-4" />
          Back to Notes
        </Link>
      </Button>

      <div className="flex items-center gap-1.5">
        <Button
          className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
          size="sm"
          variant="ghost"
        >
          <Edit className="h-4 w-4" />
          <span className="hidden sm:inline">Edit</span>
        </Button>
        <Button
          className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
          size="sm"
          variant="ghost"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              size="sm"
              variant="ghost"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/notes/${noteId}/flashcards`}>
                <Book className="mr-2 h-4 w-4" />
                <span>View Flashcards</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onExportMarkdown}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Export as Markdown</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={onExportText}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Export as Text</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={onExportPDF}>
              <FileDown className="mr-2 h-4 w-4" />
              <span>Export as PDF</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Note</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
