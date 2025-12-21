'use client';

import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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
import { useEditorMetadataDialog } from '@/features/editor/hooks/useEditorMetadataDialog';

type EditorMetadataDialogProps = {
  title: string;
  summary: string;
  keywords: string[];
  setTitle: (t: string) => void;
  setSummary: (s: string) => void;
  setKeywords: (k: string[]) => void;
};

export function EditorMetadataDialog({
  title,
  summary,
  keywords,
  setTitle,
  setSummary,
  setKeywords,
}: EditorMetadataDialogProps) {
  const {
    open,
    setOpen,
    localTitle,
    setLocalTitle,
    localSummary,
    setLocalSummary,
    localKeywords,
    setLocalKeywords,
    handleSave,
  } = useEditorMetadataDialog({
    title,
    summary,
    keywords,
    setTitle,
    setSummary,
    setKeywords,
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Info className="w-4 h-4" />
          Metadata
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Metadata</DialogTitle>
          <DialogDescription>Manage metadata for your note (title, summary, keywords).</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input onChange={(e) => setLocalTitle(e.target.value)} value={localTitle} />
          </div>

          <div className="grid gap-2">
            <Label>Summary</Label>
            <Textarea
              onChange={(e) => setLocalSummary(e.target.value)}
              style={{ resize: 'none' }}
              value={localSummary}
            />
          </div>

          <div className="grid gap-2">
            <Label>Keywords (comma-separated)</Label>
            <Input onChange={(e) => setLocalKeywords(e.target.value)} value={localKeywords} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
