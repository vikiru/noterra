'use client';

import { Book, FileDown, FileText, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NoteExportMenuProps = {
  onExportMarkdown: () => void;
  onExportText: () => void;
  onExportPDF: () => void;
};

export function NoteExportMenu({
  onExportMarkdown,
  onExportText,
  onExportPDF,
}: NoteExportMenuProps) {
  return (
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
        <DropdownMenuItem className="cursor-pointer" onClick={onExportMarkdown}>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
