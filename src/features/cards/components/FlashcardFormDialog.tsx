'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFlashcardForm } from '@/features/cards/hooks/useFlashcardForm';
import type { Flashcard } from '@/features/cards/types/flashcard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/components/ui/dialog';

type FlashcardFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteId: string;
  initialData?: Flashcard;
};

export function FlashcardFormDialog({
  open,
  onOpenChange,
  noteId,
  initialData,
}: FlashcardFormDialogProps) {
  const {
    question,
    setQuestion,
    answer,
    setAnswer,
    loading,
    validationError,
    handleSubmit,
    isEditMode,
  } = useFlashcardForm({
    noteId,
    initialData,
    onSuccess: () => onOpenChange(false),
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Flashcard' : 'Create New Flashcard'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the question and answer for this flashcard.'
              : 'Add a new flashcard to your note.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Textarea
                className="resize-none"
                id="question"
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the question..."
                rows={3}
                value={question}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                className="resize-none"
                id="answer"
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter the answer..."
                rows={4}
                value={answer}
              />
            </div>

            {validationError && (
              <p className="text-sm text-red-500">{validationError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
