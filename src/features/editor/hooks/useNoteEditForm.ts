import type { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import type { NoteEditorData } from '@/features/editor/types/NoteEditorData';
import { saveNoteChanges } from '@/features/notes/actions/notes';
import { NOTES_ROUTE } from '@/lib/constants/route';

type UseNoteEditFormProps = {
  noteId: string;
  editor: Editor | null;
  title: string;
  summary: string;
  keywords: string;
  isPublic: boolean;
  isShared: boolean;
  showCards: boolean;
};

export function useNoteEditForm({
  noteId,
  editor,
  title,
  summary,
  keywords,
  isPublic,
  isShared,
  showCards,
}: UseNoteEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!editor) return;

    const htmlContent = editor.getHTML();
    const keywordArray = keywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k !== '');

    const updatedData: NoteEditorData = {
      id: noteId,
      title,
      summary,
      keywords: keywordArray,
      content: htmlContent,
      public: isPublic,
      shared: isShared,
      showCards,
    };

    startTransition(async () => {
      const result = await saveNoteChanges(updatedData);
      if (result.success) {
        toast.success('Note updated successfully');
        router.push(`${NOTES_ROUTE}/${noteId}`);
      } else {
        toast.error(result.error || 'Failed to update note');
      }
    });
  };

  return {
    isPending,
    handleSubmit,
  };
}
