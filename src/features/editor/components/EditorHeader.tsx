'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EditorMetadataDialog } from '@/features/editor/components/EditorMetadataDialog';
import { EditorVisibilityDialog } from '@/features/editor/components/EditorVisibilityDialog';

type EditorHeaderProps = {
  title: string;
  setTitle: (title: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
  isPublic: boolean;
  setIsPublic: (isPublic: boolean) => void;
  isShared: boolean;
  setIsShared: (isShared: boolean) => void;
  showCards: boolean;
  setShowCards: (showCards: boolean) => void;
  metadataOpen: boolean;
  setMetadataOpen: (open: boolean) => void;
  visibilityOpen: boolean;
  setVisibilityOpen: (open: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
};

export function EditorHeader({
  title,
  setTitle,
  summary,
  setSummary,
  keywords,
  setKeywords,
  isPublic,
  setIsPublic,
  isShared,
  setIsShared,
  showCards,
  setShowCards,
  metadataOpen,
  setMetadataOpen,
  visibilityOpen,
  setVisibilityOpen,
  onSubmit,
  isPending,
}: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 overflow-hidden">
        <EditorMetadataDialog
          keywords={keywords}
          onOpenChange={setMetadataOpen}
          open={metadataOpen}
          setKeywords={setKeywords}
          setSummary={setSummary}
          setTitle={setTitle}
          summary={summary}
          title={title}
        />

        <EditorVisibilityDialog
          isPublic={isPublic}
          isShared={isShared}
          onOpenChange={setVisibilityOpen}
          open={visibilityOpen}
          setIsPublic={setIsPublic}
          setIsShared={setIsShared}
          setShowCards={setShowCards}
          showCards={showCards}
        />
      </div>

      <Button disabled={isPending} onClick={onSubmit} variant={'default'}>
        {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Submit Changes
      </Button>
    </div>
  );
}
