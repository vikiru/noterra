import { useTransition } from 'react';
import { toast } from 'sonner';
import { updateNoteVisibilityAction } from '@/features/notes/actions/notes';

type UseShareNoteProps = {
  noteId: string;
  shareToken: string;
  username: string;
  isPublic: boolean;
  isShared: boolean;
  showCards: boolean;
};

export function useShareNote({ noteId, shareToken, username, isPublic, isShared, showCards }: UseShareNoteProps) {
  const [isPending, startTransition] = useTransition();

  const getShareLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    if (isPublic) return `${baseUrl}/${username}/notes/${noteId}`;
    if (isShared) return `${baseUrl}/shared/${shareToken}`;
    return '';
  };

  const link = getShareLink();

  const handleSave = async () => {
    startTransition(async () => {
      const result = await updateNoteVisibilityAction(noteId, {
        public: isPublic,
        shared: isShared,
        showCards,
      });

      if (result.success) {
        toast.success('Note visibility updated');
      } else {
        toast.error(result.error || 'Failed to update visibility');
      }
    });
  };

  return {
    isPending,
    link,
    handleSave,
  };
}
