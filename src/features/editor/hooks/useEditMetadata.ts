import { useState } from 'react';

type UseEditMetadataProps = {
  initialTitle: string;
  initialSummary: string;
  initialKeywords: string[];
};

export function useEditMetadata({
  initialTitle,
  initialSummary,
  initialKeywords,
}: UseEditMetadataProps) {
  const [title, setTitle] = useState(initialTitle);
  const [summary, setSummary] = useState(initialSummary);
  const [keywords, setKeywords] = useState(initialKeywords);

  return {
    title,
    setTitle,
    summary,
    setSummary,
    keywords,
    setKeywords,
  };
}
