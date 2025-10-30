'use client';
import {
  ArrowLeft,
  Book,
  DivideCircle,
  Download,
  Edit,
  FileDown,
  FileText,
  Globe,
  Lock,
  MoreVertical,
  Share2,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type NoteDisplayProps = {
  note: {
    id: string;
    title: string;
    content: string;
    keywords: string;
    public: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function NoteDisplay({ note }: NoteDisplayProps) {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-4xl">
      {/* Back and Actions */}
      <div className="flex justify-between items-center mb-6">
        <Button asChild variant="ghost">
          <Link
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            href="/notes"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Notes
          </Link>
        </Button>

        <div className="flex items-center gap-1.5">
          <Button
            className="gap-1.5 hover:bg-muted/50 dark:hover:bg-muted/80 text-muted-foreground hover:text-foreground dark:hover:text-foreground"
            size="sm"
            variant="ghost"
          >
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            className="gap-1.5 hover:bg-muted/50 dark:hover:bg-muted/80 text-muted-foreground hover:text-foreground dark:hover:text-foreground"
            size="sm"
            variant="ghost"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-1.5 hover:bg-muted/50 dark:hover:bg-muted/80 text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                size="sm"
                variant="ghost"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Book className="mr-2 h-4 w-4" />
                <span>View Flashcards</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Export as Markdown</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
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
      </div>

      {/* Note Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {note.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div>
            <time dateTime={note.createdAt.toISOString()}>
              {note.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            {note.public ? (
              <Globe className="h-3.5 w-3.5" />
            ) : (
              <Lock className="h-3.5 w-3.5" />
            )}
            <span>{note.public ? 'Public' : 'Private'}</span>
          </div>
        </div>
      </div>

      {/* Keywords */}
      {note.keywords && (
        <div className="flex flex-wrap gap-2 mb-6">
          {note.keywords.split(',').map((keyword) => (
            <Badge className="text-xs" key={keyword.trim()} variant="secondary">
              {keyword.trim()}
            </Badge>
          ))}
        </div>
      )}

      <div
        className="prose dark:prose-invert max-w-none bg-white px-6 pb-2 pt-1 rounded-lg"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </div>
  );
}
