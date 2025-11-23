import { Eye } from 'lucide-react';
import { useEditorVisibilityDialog } from '@/features/editor/hooks/useEditorVisibilityDialog';
import { VisibilityCard } from '@/features/share/components/VisibilityCard';
import { Button } from '@/lib/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/components/ui/dialog';

type EditorVisibilityDialogProps = {
  initialState: {
    isPublic: boolean;
    isShared: boolean;
    showCards: boolean;
  };
  onSave: (state: {
    isPublic: boolean;
    isShared: boolean;
    showCards: boolean;
  }) => void;
};

export function EditorVisibilityDialog({
  initialState,
  onSave,
}: EditorVisibilityDialogProps) {
  const { open, setOpen, localState, setLocalState, handleSave } =
    useEditorVisibilityDialog({
      initialState,
      onSave,
    });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Visibility
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Visibility</DialogTitle>
          <DialogDescription>
            Manage access and visibility settings.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <VisibilityCard setState={setLocalState} state={localState} />
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
