'use client';

import { Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type EditorMetadataDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
};

export function EditorMetadataDialog({
  open,
  onOpenChange,
  title,
  setTitle,
  summary,
  setSummary,
  keywords,
  setKeywords,
}: EditorMetadataDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Metadata
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Metadata</DialogTitle>
          <DialogDescription>
            Update the title, summary, and keywords for this note.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              onChange={(e) => setSummary(e.target.value)}
              value={summary}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              onChange={(e) => setKeywords(e.target.value)}
              value={keywords}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
