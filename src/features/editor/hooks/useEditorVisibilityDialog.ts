import { useState } from 'react';

type VisibilityState = {
  isPublic: boolean;
  isShared: boolean;
  showCards: boolean;
};

type UseEditorVisibilityDialogProps = {
  initialState: VisibilityState;
  onSave: (state: VisibilityState) => void;
};

export function useEditorVisibilityDialog({ initialState, onSave }: UseEditorVisibilityDialogProps) {
  const [open, setOpen] = useState(false);
  const [localState, setLocalState] = useState(initialState);

  const handleSave = () => {
    onSave(localState);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    localState,
    setLocalState,
    handleSave,
  };
}
