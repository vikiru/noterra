'use client';

import { EditorContent } from '@tiptap/react';
import { ArrowLeft, Book, Globe, Loader2, Lock, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditorMetadataDialog } from '@/features/editor/components/EditorMetadataDialog';
import { EditorVisibilityDialog } from '@/features/editor/components/EditorVisibilityDialog';
import { TiptapToolbar } from '@/features/editor/components/TiptapToolbar';
import { useEditMetadata } from '@/features/editor/hooks/useEditMetadata';
import { useNoteEditForm } from '@/features/editor/hooks/useNoteEditForm';
import { useTiptapEditor } from '@/features/editor/hooks/useTiptapEditor';

type EditNoteFormProps = {
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

type VisibilityState = {
  isPublic: boolean;
  isShared: boolean;
  showCards: boolean;
};

export function EditNoteForm({ metadata, visibility }: EditNoteFormProps) {
  const editor = useTiptapEditor(metadata.content);

  const { title, setTitle, summary, setSummary, keywords, setKeywords } = useEditMetadata({
    initialTitle: metadata.title,
    initialSummary: metadata.summary,
    initialKeywords: metadata.keywords,
  });

  const [visibilityState, setVisibilityState] = useState<VisibilityState>({
    isPublic: visibility.isPublic,
    isShared: visibility.isShared,
    showCards: visibility.showCards,
  });

  const { isPending, handleSubmit } = useNoteEditForm({
    editor,
    metadata: { ...metadata, title, summary, keywords },
    visibility: visibilityState,
  });

  return (
    <section className="container mx-auto py-6 max-w-7xl h-[calc(100vh-4rem)]" id="note-edit">
      <div className="flex flex-col h-full gap-4">
        <div>
          <Button asChild className="w-fit -ml-2 mb-2 text-muted-foreground" size="sm" variant="ghost">
            <Link href={`/notes/${metadata.noteId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Note
            </Link>
          </Button>

          <h1 className="text-2xl font-bold max-w-full mb-2">{title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {visibilityState.isPublic ? <Globe className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{visibilityState.isPublic ? 'Public' : 'Private'}</span>
            </div>

            {visibilityState.isShared && (
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Shared</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Book className="w-3.5 h-3.5" />
              <span>Flashcards: {visibilityState.showCards ? 'Visible' : 'Hidden'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EditorMetadataDialog
              keywords={keywords}
              setKeywords={setKeywords}
              setSummary={setSummary}
              setTitle={setTitle}
              summary={summary}
              title={title}
            />
            <EditorVisibilityDialog initialState={visibilityState} onSave={(state) => setVisibilityState(state)} />
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
    </section>
  );
}
