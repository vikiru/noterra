import { useMutation } from '@tanstack/react-query';
import { generateGeminiNote } from '@/features/gemini/actions/generateGeminiNote';

import { promptSchema } from '@/gemini/schema/promptSchema';

export function useGenerateNote() {
  return useMutation({
    mutationFn: async (prompt: string) => {
      const validated = promptSchema.safeParse({ prompt });

      if (!validated.success) {
        throw new Error('Invalid prompt, please try again.');
      }

      const result = await generateGeminiNote(validated.data.prompt);
      console.log(result);

      let html = '';
      for (let i = 0; i < result.notes_contents.length; i++) {
        html += result.notes_contents[i].content;
      }

      return {
        note: {
          title: result.metadata.title,
          keywords: result.metadata.keywords,
          summary: result.metadata.summary,
          content: html,
        },
        flashcards: result.flashcards,
      };
    },
    retry: false,
  });
}
