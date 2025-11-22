'use client';

import { EditorMetadataDialog } from '@/features/editor/components/EditorMetadataDialog';
import type { useEditMetadata } from '@/features/editor/hooks/useEditMetadata';

type NoteMetadataProps = {
  metadata: ReturnType<typeof useEditMetadata>;
};

export function NoteMetadata({ metadata }: NoteMetadataProps) {
  return (
    <EditorMetadataDialog
      keywords={metadata.keywords}
      onOpenChange={metadata.setMetadataOpen}
      open={metadata.metadataOpen}
      setKeywords={metadata.setKeywords}
      setSummary={metadata.setSummary}
      setTitle={metadata.setTitle}
      summary={metadata.summary}
      title={metadata.title}
    />
  );
}
