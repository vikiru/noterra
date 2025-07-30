import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function EditNotePage() {
  return (
    <section class="w-full min-h-screen flex flex-col">
      <section class="w-full max-w-5xl mx-auto space-y-6 px-4 sm:px-6 py-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold tracking-tight text-balance text-center sm:text-left">
            Edit Note
          </h2>
          <Button class="cursor-pointer" type="submit" variant="outline">
            Save Note
          </Button>
        </div>
        <section class="grid gap-4" id="note-metadata">
          <div class="grid gap-2">
            <Label for="note-title">Title</Label>
            <Input
              id="note-title"
              placeholder="Recursion: An Alternative to Iterative Approach"
            />
          </div>
          <div class="grid gap-2">
            <Label for="note-keywords">Keywords (comma-separated)</Label>
            <Input
              id="note-keywords"
              placeholder="DFS, Recursion, Iteration, Time Complexity"
            />
          </div>
        </section>

        <section
          class="flex flex-wrap items-center gap-8 rounded-md border border-neutral-200 bg-background px-3 py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          id="note-toolbar"
        >
          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Bold"
              type="button"
            >
              <Bold class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Italic"
              type="button"
            >
              <Italic class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Underline"
              type="button"
            >
              <Underline class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Strikethrough"
              type="button"
            >
              <Strikethrough class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Remove Formatting"
              type="button"
            >
              <RemoveFormatting class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Highlight"
              type="button"
            >
              <Highlighter class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Code"
              type="button"
            >
              <Code class="size-4" />
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Heading 1"
              type="button"
            >
              <Heading1 class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Heading 2"
              type="button"
            >
              <Heading2 class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Heading 3"
              type="button"
            >
              <Heading3 class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Heading 4"
              type="button"
            >
              <Heading4 class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Heading 5"
              type="button"
            >
              <Heading5 class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Heading 6"
              type="button"
            >
              <Heading6 class="size-4" />
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Quote"
              type="button"
            >
              <Quote class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Minus"
              type="button"
            >
              <Minus class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Bulleted List"
              type="button"
            >
              <List class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Numbered List"
              type="button"
            >
              <ListOrdered class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Superscript"
              type="button"
            >
              <Superscript class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Subscript"
              type="button"
            >
              <Subscript class="size-4" />
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Align Left"
              type="button"
            >
              <AlignLeft class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Align Center"
              type="button"
            >
              <AlignCenter class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Align Justify"
              type="button"
            >
              <AlignJustify class="size-4" />
            </button>
            <button
              class="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
              title="Align Right"
              type="button"
            >
              <AlignRight class="size-4" />
            </button>
          </div>
        </section>

        <section class="h-[75vh] overflow-y-auto rounded-md border border-neutral-200 bg-background px-4 py-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <Textarea
            class="h-full min-h-[50vh] resize-none"
            placeholder="Start writing or paste HTML content here..."
          />
        </section>
      </section>
    </section>
  );
}
