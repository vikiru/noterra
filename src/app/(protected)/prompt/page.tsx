import type { Metadata } from 'next';
import { PromptForm } from '@/features/gemini/components/PromptForm';
import { PromptTips } from '@/features/gemini/components/PromptTips';

export const metadata: Metadata = {
  title: 'Noterra | Generate Notes',
  description: 'Generate AI-powered notes and flashcards for any topic.',
};

export default function PromptPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header Content */}
      <div className="mb-10 space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
          Generate AI-Powered Notes
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground font-body">
          Enter any topic and let our AI create comprehensive,
          easy-to-understand notes for you.
        </p>
      </div>

      {/* Main Content */}
      <PromptForm />

      {/* Tips Section */}
      <PromptTips />
    </div>
  );
}
