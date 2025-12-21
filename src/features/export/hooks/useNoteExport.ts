import { type RefObject, useCallback } from 'react';
import TurnDown from 'turndown';

type UseNoteExportProps = {
  title: string;
  content: string;
  contentRef: RefObject<HTMLDivElement | null>;
};

export function useNoteExport({ title, content, contentRef }: UseNoteExportProps) {
  const convertToMarkdown = useCallback(() => {
    if (contentRef?.current) {
      const turnDownService = new TurnDown();
      const markdown = turnDownService.turndown(content);

      const normalized = markdown.replace(/\r?\n/g, '\r\n');
      const blob = new Blob([normalized], {
        type: 'text/markdown; charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [title, content, contentRef]);

  const convertToText = useCallback(() => {
    if (contentRef?.current) {
      const turnDownService = new TurnDown();
      const markdown = turnDownService.turndown(content);

      const normalized = markdown.replace(/\r?\n/g, '\r\n');
      const blob = new Blob([normalized], {
        type: 'text/plain; charset=utf-8',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [title, content, contentRef]);

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
