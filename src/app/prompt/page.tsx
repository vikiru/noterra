'use client';

import { Loader2, WandSparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NOTES_ROUTE } from '@/constants/route';
import { generateGeminiNote } from '@/gemini/actions/generateGeminiNote';
import { promptSchema } from '@/gemini/schema/promptSchema';
import { combineHTML } from '@/utils/combineHTML';
import { updateTOC } from '@/utils/updateTOC';

// TODO: clean this up. Split into hooks/etc, improve error/status msgs. Properly store note into state etc.
export default function PromptPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const validatedPrompt = promptSchema.safeParse({ prompt });
    if (!validatedPrompt.success) {
      setValidationError('Invalid prompt provided, please try again.');
      return;
    }
    setValidationError('');
    const geminiPrompt = validatedPrompt.data.prompt;

    try {
      setLoading(true);
      const response = await generateGeminiNote(geminiPrompt);
      const htmlResponse = combineHTML(response.notes_contents);
      console.log(response.metadata);
      const updatedHTML = await updateTOC(htmlResponse);
      const _note = {
        title: response.metadata.title,
        keywords: response.metadata.keywords,
        summary: response.metadata.summary,
        content: updatedHTML,
      };
      const _flashcards = response.flashcards;
      setLoading(false);
      toast.success('Note generated successfully!');
      router.push(NOTES_ROUTE);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      toast.error(error);
    }
  };

  return (
    <section
      class="flex min-h-screen flex-col items-center justify-center overflow-hidden dark:bg-zinc-900"
      id="prompt-page"
    >
      <div class="-mt-20 flex flex-col items-center justify-center">
        <h2 class="my-4 bg-gradient-to-tr from-rose-500 via-orange-400 to-yellow-300 bg-clip-text py-2 tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Bright Ideas Start Here
        </h2>
        <p class="-mt-4 mb-4 text-lg tracking-wider text-gray-300 lg:text-xl">
          Generate detailed notes and flashcards on any topic!
        </p>
      </div>

      <div class="flex w-full items-center space-x-2 py-2 sm:max-w-xl lg:max-w-4xl">
        <Input
          class={`${prompt ? 'lowercase' : ''} lg:h-10 lg:text-lg`}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
          placeholder="Enter a topic here"
          type="text"
          value={prompt}
        />
        <Button
          class="hover:cursor-pointer lg:text-base"
          disabled={loading}
          onClick={handleSubmit}
          size={'lg'}
          type="submit"
        >
          {loading ? 'Generating...' : 'Generate'}
          {loading ? (
            <Loader2 class="animate-spin" size={24} />
          ) : (
            <WandSparkles size={24} />
          )}
        </Button>
      </div>
      <div class="mx-4 flex flex-row items-start justify-start">
        {validationError && (
          <p class="text-start text-red-500">{validationError}</p>
        )}
      </div>

      <div class="mx-4 mt-4 flex flex-wrap justify-center gap-2">
        <div class="mx-4 mt-4 flex flex-wrap justify-center gap-2">
          <button
            class="text-md rounded-lg bg-zinc-800 px-6 py-2 hover:cursor-pointer sm:px-3 sm:py-2 sm:text-base"
            onClick={() => setPrompt('Explain Recursion')}
          >
            <h5>Explain Recursion</h5>
          </button>
          <button
            class="rounded-lg bg-zinc-800 px-6 py-2 hover:cursor-pointer sm:px-3 sm:py-2 sm:text-base"
            onClick={() => setPrompt('Explain Photosynthesis')}
          >
            <h5>Explain Photosynthesis</h5>
          </button>
          <button
            class="rounded-lg bg-zinc-800 px-6 py-2 hover:cursor-pointer sm:px-3 sm:py-2 sm:text-base"
            onClick={() => setPrompt('Explain the History of the Internet')}
          >
            <h5>Explain the History of the Internet</h5>
          </button>
          <button
            class="rounded-lg bg-zinc-800 px-6 py-2 hover:cursor-pointer sm:px-3 sm:py-2 sm:text-base"
            onClick={() => setPrompt('Explain Supply and Demand')}
          >
            <h5>Explain Supply and Demand</h5>
          </button>
        </div>
      </div>
    </section>
  );
}
