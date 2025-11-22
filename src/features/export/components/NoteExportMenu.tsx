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
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/lib/components/ui/separator';

type NoteExportMenuProps = {
  onExportMarkdown: () => void;
  onExportText: () => void;
  onExportPDF: () => void;
  onDelete?: () => void;
  showFlashcardButton?: boolean;
  isStandalone?: boolean;
};

export function NoteExportMenu({
  onExportMarkdown,
  onExportText,
  onExportPDF,
  onDelete,
  showFlashcardButton = true,
  isStandalone = false,
}: NoteExportMenuProps) {
  const pathname = usePathname();
  const flashcardsLink = `${pathname}/flashcards`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isStandalone ? (
          <Button size="sm">
            <FileDown className="h-4 w-4" />
            Export
            <Separator className="h-2 bg-black" orientation="vertical" />
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            size="sm"
            variant="ghost"
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        )}
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
        {onDelete && (
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
