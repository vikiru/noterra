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
import mermaid from 'mermaid';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    keywords: string[];
    public: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

import TurnDown from 'turndown';

// TODO: Massive refactor this and all other pages, split server/client and proper props etc. Use custom hooks where possible.

export function NoteDisplay({ note }: NoteDisplayProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const printSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
    });

    const renderMermaidDiagrams = async () => {
      const mermaidDivs = document.querySelectorAll(
        'div[id*="diagram"], div#mindmap-overview-mindmap, div[id*="mindmap"], pre.mermaid',
      );
      const mermaidDiagrams = [];

      mermaidDivs.forEach((div) => {
        const pre = div.firstElementChild;
        console.log(pre);
        if (pre && pre.tagName === 'PRE') {
          mermaidDiagrams.push(pre);
        }
      });

      if (mermaidDiagrams.length > 0) {
        await mermaid.run({
          nodes: mermaidDiagrams,
          suppressErrors: true,
        });
      }
    };

    renderMermaidDiagrams();
  }, [note.content]);

  // TODO: Clean up these hooks.
  const convertToMarkdown = useCallback(() => {
    if (contentRef.current) {
      const turnDownService = new TurnDown();
      const markdown = turnDownService.turndown(contentRef.current.innerHTML);
      console.log(note.title);

      // Create a blob and trigger download
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [note.title]);

  const convertToText = useCallback(() => {
    if (contentRef.current) {
      const turnDownService = new TurnDown();
      const markdown = turnDownService.turndown(contentRef.current.innerHTML);

      // Create a blob and trigger download
      const blob = new Blob([markdown], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [note.title]);

  const convertToPDF = useCallback(async () => {
    if (printSectionRef.current) {
      window.print();
    }
  }, [note.title]);

  return (
    <section
      className="container max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8"
      id="note-ctr"
    >
      {/* Back and Actions */}
      <section className="flex justify-between items-center mb-6" id="actions">
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

          <section id="dropdown-menu">
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
                  <span>
                    <a href={`/notes/${note.id}/flashcards`}>View Flashcards</a>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={convertToMarkdown}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Export as Markdown</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={convertToText}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Export as Text</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={convertToPDF}
                >
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
          </section>
        </div>
      </section>

      <section id="note" ref={printSectionRef}>
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
            {note.keywords.map((kw) => (
              <Badge className="text-xs" key={kw.trim()} variant="secondary">
                {kw.trim()}
              </Badge>
            ))}
          </div>
        )}

        <section
          className="max-w-none bg-white dark:bg-red prose px-6 pb-2 pt-1 rounded-lg dark:bg-black"
          dangerouslySetInnerHTML={{ __html: note.content }}
          id="note-content"
          ref={contentRef}
        />
      </section>
    </section>
  );
}
