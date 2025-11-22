'use client';

import { EditorContent } from '@tiptap/react';
import { ArrowLeft, Book, Globe, Lock, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { EditorHeader } from '@/features/editor/components/EditorHeader';
import { TiptapToolbar } from '@/features/editor/components/TiptapToolbar';
import { useTiptapEditor } from '@/features/editor/hooks/useTiptapEditor';
import type { NoteEditorData } from '@/features/editor/types/noteEditorData';
import { saveNoteChanges } from '@/features/notes/actions/notes';

type EditNoteFormProps = {
  initialData: NoteEditorData;
};

export function EditNoteForm({ initialData }: EditNoteFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(initialData.title);
  const [summary, setSummary] = useState(initialData.summary);
  const [keywords, setKeywords] = useState(initialData.keywords.join(', '));

  const [isPublic, setIsPublic] = useState(initialData.public);
  const [isShared, setIsShared] = useState(initialData.shared);
  const [showCards, setShowCards] = useState(initialData.showCards);

  const [metadataOpen, setMetadataOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);

  const editor = useTiptapEditor(initialData.content);

  const handleSubmit = () => {
    if (!editor) return;

    const htmlContent = editor.getHTML();
    const keywordArray = keywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k !== '');

    const updatedData: NoteEditorData = {
      id: initialData.id,
      title,
      summary,
      keywords: keywordArray,
      content: htmlContent,
      public: isPublic,
      shared: isShared,
      showCards: showCards,
    };

    startTransition(async () => {
      const result = await saveNoteChanges(updatedData);
      if (result.success) {
        toast.success('Note updated successfully');
        router.push(`/notes/${initialData.id}`);
      } else {
        toast.error(result.error || 'Failed to update note');
      }
    });
  };

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

        <h1 className="text-2xl font-bold max-w-full mb-2">{title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {isPublic ? (
              <Globe className="w-3.5 h-3.5" />
            ) : (
              <Lock className="w-3.5 h-3.5" />
            )}
            <span>{isPublic ? 'Public' : 'Private'}</span>
          </div>

          {isShared && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Shared</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Book className="w-3.5 h-3.5" />
            <span>Flashcards: {showCards ? 'Visible' : 'Hidden'}</span>
          </div>
        </div>
      </div>

      <EditorHeader
        isPending={isPending}
        isPublic={isPublic}
        isShared={isShared}
        keywords={keywords}
        metadataOpen={metadataOpen}
        onSubmit={handleSubmit}
        setIsPublic={setIsPublic}
        setIsShared={setIsShared}
        setKeywords={setKeywords}
        setMetadataOpen={setMetadataOpen}
        setShowCards={setShowCards}
        setSummary={setSummary}
        setTitle={setTitle}
        setVisibilityOpen={setVisibilityOpen}
        showCards={showCards}
        summary={summary}
        title={title}
        visibilityOpen={visibilityOpen}
      />

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
