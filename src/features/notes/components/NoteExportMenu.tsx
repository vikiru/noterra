'use client';

import { FileDown, FileText, MoreVertical, Trash2 } from 'lucide-react';
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
  onDelete?: () => void;
};

export function NoteExportMenu({
  onExportMarkdown,
  onExportText,
  onExportPDF,
  onDelete,
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
          <FileDown className="mr-2 h-4 w-4" />
          <span>Export as Markdown</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onExportText}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as Text</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Note</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
