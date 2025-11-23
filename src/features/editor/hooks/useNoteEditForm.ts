'use client';

import type { Editor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import type { NoteEditorData } from '@/features/editor/types/NoteEditorData';
import { saveNoteChanges } from '@/features/notes/actions/notes';
import { NOTES_ROUTE } from '@/lib/constants/route';

type UseNoteEditFormProps = {
  editor: Editor | null;
  metadata: {
    noteId: string;
    title: string;
    content: string;
    summary: string;
    keywords: string[];
  };
  visibility: {
    isPublic: boolean;
    isShared: boolean;
    showCards: boolean;
  };
};

export function useNoteEditForm({
  editor,
  metadata,
  visibility,
}: UseNoteEditFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!editor) return;

    const htmlContent = editor.getHTML();

    const updatedData: NoteEditorData = {
      id: metadata.noteId,
      title: metadata.title,
      summary: metadata.summary,
      keywords: metadata.keywords.map((k) => k.trim()).filter(Boolean),
      content: htmlContent,
      public: visibility.isPublic,
      shared: visibility.isShared,
      showCards: visibility.showCards,
    };

    startTransition(async () => {
      const result = await saveNoteChanges(updatedData);

      if (result.success) {
        toast.success('Note updated successfully');
        router.push(`${NOTES_ROUTE}/${metadata.noteId}`);
      } else {
        toast.error(result.error || 'Failed to update note');
      }
    });
  };

  return { isPending, handleSubmit };
}
