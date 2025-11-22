'use client';

import { type Editor, useEditorState } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo,
  Unlink,
} from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LinkDialog } from '@/features/editor/components/LinkDialog';

type TiptapToolbarProps = {
  editor: Editor | null;
};

export function TiptapToolbar({ editor }: TiptapToolbarProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive('bold'),
      isItalic: ctx.editor?.isActive('italic'),
      isUnderline: ctx.editor?.isActive('underline'),
      isStrike: ctx.editor?.isActive('strike'),
      isCode: ctx.editor?.isActive('code'),
      isLink: ctx.editor?.isActive('link'),
      isHeading2: ctx.editor?.isActive('heading', { level: 2 }),
      isHeading3: ctx.editor?.isActive('heading', { level: 3 }),
      isHeading4: ctx.editor?.isActive('heading', { level: 4 }),
      isAlignLeft: ctx.editor?.isActive({ textAlign: 'left' }),
      isAlignCenter: ctx.editor?.isActive({ textAlign: 'center' }),
      isAlignRight: ctx.editor?.isActive({ textAlign: 'right' }),
      isAlignJustify: ctx.editor?.isActive({ textAlign: 'justify' }),
      canUndo: ctx.editor?.can().undo(),
      canRedo: ctx.editor?.can().redo(),
      canUnsetLink: ctx.editor?.can().unsetLink(),
    }),
  });

  if (!editor || !editorState) {
    return null;
  }

  const getLinkUrl = () => editor.getAttributes('link').href || '';

  const openLinkDialog = () => {
    setIsLinkDialogOpen(true);
  };

  const handleSetLink = (url: string) => {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 p-2 flex items-center gap-1 bg-white dark:bg-neutral-950 overflow-x-auto w-full">
      {/* Headings */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Heading 2"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            pressed={editorState.isHeading2}
            size="sm"
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Heading 2</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Heading 3"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            pressed={editorState.isHeading3}
            size="sm"
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Heading 3</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Heading 4"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            pressed={editorState.isHeading4}
            size="sm"
          >
            <Heading4 className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Heading 4</TooltipContent>
      </Tooltip>

      <Separator className="h-6 mx-1 shrink-0" orientation="vertical" />

      {/* Basic Formatting */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Bold"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            pressed={editorState.isBold}
            size="sm"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bold</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Italic"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            pressed={editorState.isItalic}
            size="sm"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Italic</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Underline"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            pressed={editorState.isUnderline}
            size="sm"
          >
            <Underline className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Underline</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Strikethrough"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            pressed={editorState.isStrike}
            size="sm"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Strikethrough</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Highlight"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleHighlight().run()
            }
            pressed={editor.isActive('highlight')}
            size="sm"
          >
            <Highlighter className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Highlight</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Code"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            pressed={editorState.isCode}
            size="sm"
          >
            <Code className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Code</TooltipContent>
      </Tooltip>

      <Separator className="h-6 mx-1 shrink-0" orientation="vertical" />

      {/* Lists & Quotes */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Bullet List"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            pressed={editor.isActive('bulletList')}
            size="sm"
          >
            <List className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bullet List</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Ordered List"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            pressed={editor.isActive('orderedList')}
            size="sm"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Ordered List</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Blockquote"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            pressed={editor.isActive('blockquote')}
            size="sm"
          >
            <Quote className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Blockquote</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Horizontal Rule"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().setHorizontalRule().run()
            }
            pressed={false}
            size="sm"
          >
            <Minus className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Horizontal Rule</TooltipContent>
      </Tooltip>

      <Separator className="h-6 mx-1 shrink-0" orientation="vertical" />

      {/* Script */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Subscript"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleSubscript().run()
            }
            pressed={editor.isActive('subscript')}
            size="sm"
          >
            <Subscript className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Subscript</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Superscript"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().toggleSuperscript().run()
            }
            pressed={editor.isActive('superscript')}
            size="sm"
          >
            <Superscript className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Superscript</TooltipContent>
      </Tooltip>

      <Separator className="h-6 mx-1 shrink-0" orientation="vertical" />

      {/* Links */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Link"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={openLinkDialog}
            pressed={editorState.isLink}
            size="sm"
          >
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Link</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Unlink"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            disabled={!editorState.canUnsetLink}
            onPressedChange={() => editor.chain().focus().unsetLink().run()}
            pressed={false}
            size="sm"
          >
            <Unlink className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Unlink</TooltipContent>
      </Tooltip>

      <Separator className="h-6 mx-1 shrink-0" orientation="vertical" />

      {/* Alignment */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Align Left"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('left').run()
            }
            pressed={editorState.isAlignLeft}
            size="sm"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Align Left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Align Center"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('center').run()
            }
            pressed={editorState.isAlignCenter}
            size="sm"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Align Center</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Align Right"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('right').run()
            }
            pressed={editorState.isAlignRight}
            size="sm"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Align Right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Align Justify"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().setTextAlign('justify').run()
            }
            pressed={editorState.isAlignJustify}
            size="sm"
          >
            <AlignJustify className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Align Justify</TooltipContent>
      </Tooltip>

      <Separator className="h-6 mx-1 shrink-0" orientation="vertical" />

      {/* Clear Formatting */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Clear Formatting"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            onPressedChange={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
            pressed={false}
            size="sm"
          >
            <RemoveFormatting className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Clear Formatting</TooltipContent>
      </Tooltip>

      {/* Undo/Redo */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Undo"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            disabled={!editorState.canUndo}
            onPressedChange={() => editor.chain().focus().undo().run()}
            pressed={false}
            size="sm"
          >
            <Undo className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Undo</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label="Redo"
            className="shrink-0 data-[state=on]:bg-neutral-900 data-[state=on]:text-neutral-50 dark:data-[state=on]:bg-neutral-50 dark:data-[state=on]:text-neutral-900"
            disabled={!editorState.canRedo}
            onPressedChange={() => editor.chain().focus().redo().run()}
            pressed={false}
            size="sm"
          >
            <Redo className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Redo</TooltipContent>
      </Tooltip>

      <LinkDialog
        initialUrl={getLinkUrl()}
        onOpenChange={setIsLinkDialogOpen}
        onRemove={handleRemoveLink}
        onSubmit={handleSetLink}
        open={isLinkDialogOpen}
      />
    </div>
  );
}
