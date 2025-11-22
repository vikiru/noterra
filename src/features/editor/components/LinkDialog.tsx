'use client';

import { Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLinkDialog } from '@/features/editor/hooks/useLinkDialog';

type LinkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialUrl?: string;
  onSubmit: (url: string) => void;
  onRemove: () => void;
};

export function LinkDialog({
  open,
  onOpenChange,
  initialUrl = '',
  onSubmit,
  onRemove,
}: LinkDialogProps) {
  const { url, setUrl, handleSubmit, handleRemove } = useLinkDialog({
    initialUrl,
    onSubmit,
    onRemove,
    onOpenChange,
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <LinkIcon className="w-4 h-4 inline mr-2" />
            {initialUrl ? 'Edit Link' : 'Insert Link'}
          </DialogTitle>
          <DialogDescription>
            {initialUrl
              ? 'Update the URL for this link or remove it.'
              : 'Enter a URL to create a hyperlink.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                autoFocus
                id="url"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                type="url"
                value={url}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            {initialUrl && (
              <Button
                onClick={handleRemove}
                type="button"
                variant="destructive"
              >
                Remove Link
              </Button>
            )}
            <Button disabled={!url.trim()} type="submit">
              {initialUrl ? 'Update Link' : 'Insert Link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
