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
        <section className="w-full min-h-screen flex flex-col">
            <section className="w-full max-w-5xl mx-auto space-y-6 px-4 sm:px-6 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight text-balance text-center sm:text-left">
                        Edit Note
                    </h2>
                    <Button
                        className="cursor-pointer"
                        type="submit"
                        variant="outline"
                    >
                        Save Note
                    </Button>
                </div>
                <section className="grid gap-4" id="note-metadata">
                    <div className="grid gap-2">
                        <Label htmlFor="note-title">Title</Label>
                        <Input
                            id="note-title"
                            placeholder="Recursion: An Alternative to Iterative Approach"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="note-keywords">
                            Keywords (comma-separated)
                        </Label>
                        <Input
                            id="note-keywords"
                            placeholder="DFS, Recursion, Iteration, Time Complexity"
                        />
                    </div>
                </section>

                <section
                    className="flex flex-wrap items-center gap-8 rounded-md border border-neutral-200 bg-background px-3 py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                    id="note-toolbar"
                >
                    <div className="flex items-center gap-2">
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Bold"
                            type="button"
                        >
                            <Bold className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Italic"
                            type="button"
                        >
                            <Italic className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Underline"
                            type="button"
                        >
                            <Underline className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Strikethrough"
                            type="button"
                        >
                            <Strikethrough className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Remove Formatting"
                            type="button"
                        >
                            <RemoveFormatting className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Highlight"
                            type="button"
                        >
                            <Highlighter className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Code"
                            type="button"
                        >
                            <Code className="size-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Heading 1"
                            type="button"
                        >
                            <Heading1 className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Heading 2"
                            type="button"
                        >
                            <Heading2 className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Heading 3"
                            type="button"
                        >
                            <Heading3 className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Heading 4"
                            type="button"
                        >
                            <Heading4 className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Heading 5"
                            type="button"
                        >
                            <Heading5 className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Heading 6"
                            type="button"
                        >
                            <Heading6 className="size-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Quote"
                            type="button"
                        >
                            <Quote className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Minus"
                            type="button"
                        >
                            <Minus className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Bulleted List"
                            type="button"
                        >
                            <List className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Numbered List"
                            type="button"
                        >
                            <ListOrdered className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Superscript"
                            type="button"
                        >
                            <Superscript className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Subscript"
                            type="button"
                        >
                            <Subscript className="size-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Align Left"
                            type="button"
                        >
                            <AlignLeft className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Align Center"
                            type="button"
                        >
                            <AlignCenter className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Align Justify"
                            type="button"
                        >
                            <AlignJustify className="size-4" />
                        </button>
                        <button
                            className="cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors p-1"
                            title="Align Right"
                            type="button"
                        >
                            <AlignRight className="size-4" />
                        </button>
                    </div>
                </section>

                <section className="h-[75vh] overflow-y-auto rounded-md border border-neutral-200 bg-background px-4 py-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <Textarea
                        className="h-full min-h-[50vh] resize-none"
                        placeholder="Start writing or paste HTML content here..."
                    />
                </section>
            </section>
        </section>
    );
}
