'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NoteDeleteButton } from './NoteDeleteButton';
import { NoteEditButton } from './NoteEditButton';
import { NoteExportMenu } from './NoteExportMenu';
import { NoteShareButton } from './NoteShareButton';

type NoteActionsProps = {
  onExportMarkdown: () => void;
  onExportText: () => void;
  onExportPDF: () => void;
  onDelete: () => void;
  onShare: () => void;
};

export function NoteActions({
  onExportMarkdown,
  onExportText,
  onExportPDF,
  onDelete,
  onShare,
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
        <NoteEditButton />
        <NoteShareButton onClick={onShare} />
        <NoteExportMenu
          onExportMarkdown={onExportMarkdown}
          onExportPDF={onExportPDF}
          onExportText={onExportText}
        />
        <NoteDeleteButton onClick={onDelete} />
      </div>
    </section>
  );
}
