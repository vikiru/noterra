'use client';

import { EditorVisibilityDialog } from '@/features/editor/components/EditorVisibilityDialog';
import type { useEditVisibility } from '@/features/editor/hooks/useEditVisibility';

type NoteVisibilityProps = {
  visibility: ReturnType<typeof useEditVisibility>;
};

export function NoteVisibility({ visibility }: NoteVisibilityProps) {
  return (
    <EditorVisibilityDialog
      isPublic={visibility.isPublic}
      isShared={visibility.isShared}
      onOpenChange={visibility.setVisibilityOpen}
      open={visibility.visibilityOpen}
      setIsPublic={visibility.setIsPublic}
      setIsShared={visibility.setIsShared}
      setShowCards={visibility.setShowCards}
      showCards={visibility.showCards}
    />
  );
}
