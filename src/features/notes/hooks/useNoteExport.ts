import { useCallback, RefObject } from 'react';
import TurnDown from 'turndown';

interface UseNoteExportProps {
  note: {
    title: string;
  };
  contentRef: RefObject<HTMLDivElement>;
  printSectionRef?: RefObject<HTMLDivElement>;
}

export function useNoteExport({
  note,
  contentRef,
  printSectionRef,
}: UseNoteExportProps) {
  const convertToMarkdown = useCallback(() => {
    if (contentRef.current) {
      const turnDownService = new TurnDown();
      const markdown = turnDownService.turndown(contentRef.current.innerHTML);

      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [note.title, contentRef]);

  const convertToText = useCallback(() => {
    if (contentRef.current) {
      const turnDownService = new TurnDown();
      const markdown = turnDownService.turndown(contentRef.current.innerHTML);

      const blob = new Blob([markdown], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [note.title, contentRef]);

  const convertToPDF = useCallback(async () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }, []);

  return {
    convertToMarkdown,
    convertToText,
    convertToPDF,
  };
}
