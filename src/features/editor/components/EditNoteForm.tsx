'use client';

import { EditorContent } from '@tiptap/react';
import { ArrowLeft, Book, Globe, Loader2, Lock, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { NoteMetadata } from '@/features/editor/components/NoteMetadata';
import { NoteVisibility } from '@/features/editor/components/NoteVisibility';
import { TiptapToolbar } from '@/features/editor/components/TiptapToolbar';
import { useEditMetadata } from '@/features/editor/hooks/useEditMetadata';
import { useEditVisibility } from '@/features/editor/hooks/useEditVisibility';
import { useNoteEditForm } from '@/features/editor/hooks/useNoteEditForm';
import { useTiptapEditor } from '@/features/editor/hooks/useTiptapEditor';
import type { NoteEditorData } from '@/features/editor/types/NoteEditorData';

type EditNoteFormProps = {
  initialData: NoteEditorData;
};

export function EditNoteForm({ initialData }: EditNoteFormProps) {
  const editor = useTiptapEditor(initialData.content);

  const metadata = useEditMetadata({
    initialTitle: initialData.title,
    initialSummary: initialData.summary,
    initialKeywords: initialData.keywords,
  });

  const visibility = useEditVisibility({
    initialPublic: initialData.public,
    initialShared: initialData.shared,
    initialShowCards: initialData.showCards,
  });

  const { isPending, handleSubmit } = useNoteEditForm({
    noteId: initialData.id,
    editor,
    title: metadata.title,
    summary: metadata.summary,
    keywords: metadata.keywords,
    isPublic: visibility.isPublic,
    isShared: visibility.isShared,
    showCards: visibility.showCards,
  });

  return (
    <div className="flex flex-col h-full gap-4">
      <div>
        <Button
          asChild
          className="w-fit -ml-2 mb-2 text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Link href={`/notes/${initialData.id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Note
          </Link>
        </Button>

        <h1 className="text-2xl font-bold max-w-full mb-2">{metadata.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {visibility.isPublic ? (
              <Globe className="w-3.5 h-3.5" />
            ) : (
              <Lock className="w-3.5 h-3.5" />
            )}
            <span>{visibility.isPublic ? 'Public' : 'Private'}</span>
          </div>

          {visibility.isShared && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Shared</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Book className="w-3.5 h-3.5" />
            <span>
              Flashcards: {visibility.showCards ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NoteMetadata metadata={metadata} />
          <NoteVisibility visibility={visibility} />
        </div>

        <Button disabled={isPending} onClick={handleSubmit} variant="default">
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Submit Changes
        </Button>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col flex-1 overflow-hidden bg-white dark:bg-neutral-950 shadow-sm">
        <TiptapToolbar editor={editor} />
        <div className="flex-1 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="text-xs text-neutral-500 text-right">
        {editor?.storage.characterCount.characters()} characters
      </div>
    </div>
  );
}
