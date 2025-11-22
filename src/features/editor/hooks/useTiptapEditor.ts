import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export const useTiptapEditor = (content: string) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        code: {
          HTMLAttributes: {
            class:
              'bg-neutral-100 dark:bg-neutral-800 rounded px-1 py-0.5 font-mono text-sm',
          },
        },
        heading: {
          levels: [2, 3, 4],
        },
        link: {
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-blue-500 underline cursor-pointer',
          },
        },
        underline: {},
      }),
      Highlight,
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CharacterCount,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-2',
      },
    },
  });

  return editor;
};
