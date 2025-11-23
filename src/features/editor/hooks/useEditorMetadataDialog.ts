import { useEffect, useState } from 'react';

type UseEditorMetadataDialogProps = {
  title: string;
  summary: string;
  keywords: string[];
  setTitle: (t: string) => void;
  setSummary: (s: string) => void;
  setKeywords: (k: string[]) => void;
};

export function useEditorMetadataDialog({
  title,
  summary,
  keywords,
  setTitle,
  setSummary,
  setKeywords,
}: UseEditorMetadataDialogProps) {
  const [open, setOpen] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localSummary, setLocalSummary] = useState(summary);
  const [localKeywords, setLocalKeywords] = useState(keywords.join(', '));

  useEffect(() => {
    if (open) {
      setLocalTitle(title);
      setLocalSummary(summary);
      setLocalKeywords(keywords.join(', '));
    }
  }, [open, title, summary, keywords]);

  const handleSave = () => {
    setTitle(localTitle);
    setSummary(localSummary);

    const kws = localKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    setKeywords(kws);
    setOpen(false);
  };

  return {
    open,
    setOpen,
    localTitle,
    setLocalTitle,
    localSummary,
    setLocalSummary,
    localKeywords,
    setLocalKeywords,
    handleSave,
  };
}
