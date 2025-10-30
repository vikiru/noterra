"use client";

import { useAuth } from "@clerk/nextjs";
import { Copy, Lightbulb, Loader2, WandSparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createMultipleFlashcards } from "@/features/cards/actions/flashcard";
import { generateGeminiNote } from "@/features/gemini/actions/generateGeminiNote";
import { constructCards } from "@/features/gemini/utils/constructCards";
import { constructNote } from "@/features/gemini/utils/constructNote";
import { createNote } from "@/features/notes/actions/notes";
import type { Note } from "@/features/notes/types/notes";
import { promptSchema } from "@/gemini/schema/promptSchema";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { validateData } from "@/lib/utils/validateData";

export default function PromptPage() {
  const { userId } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [log, setLog] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    const result = promptSchema.safeParse({ prompt: e.target.value });
    setValidationError(result.success ? "" : result.error.issues[0].message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateData({ prompt }, promptSchema);
    if (!result.success) {
      setValidationError(result.error);
      return;
    }
    const validatedPrompt = result.data.prompt;

    try {
      setLog("Generating note with Gemini....");
      setLoading(true);
      const geminiResponseData = await generateGeminiNote(validatedPrompt);

      if (!geminiResponseData.success) {
        toast.error(geminiResponseData.error);
        setLog("");
        setLoading(false);
        return;
      }

      setLog("Successfully generated note with Gemini.");
      setLog("Combining note contents into singular note...");
      const note = constructNote(geminiResponseData.data, userId as string);

      setLog("Inserting note into DB...");
      const noteCreationResult = await createNote(note);
      if (!noteCreationResult.success) {
        toast.error(noteCreationResult.error);
        setLog("");
        setLoading(false);
        return;
      }

      const newNote = noteCreationResult.data as Note;
      toast.success("Note generated successfully!");

      setLog("Constructing flashcard data for DB insertion...");
      const flashcards = constructCards(
        geminiResponseData.data.flashcards,
        newNote.authorId,
        newNote.id
      );
      const flashcardsCreationResult = await createMultipleFlashcards(
        flashcards
      );

      if (!flashcardsCreationResult.success) {
        toast.error(flashcardsCreationResult.error);
        setLog("");
        setLoading(false);
        return;
      }

      toast.success("Flashcards generated successfully!");
      setLog("Successfully inserted flashcards into DB.");
      setLoading(false);

      // Redirect or useStore usage here
      // redirect(`${NOTES_ROUTE}/${newNote.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred while generating note.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-10 space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Generate AI-Powered Notes
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Enter any topic and let our AI create comprehensive,
          easy-to-understand notes for you.
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Prompt Input */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="block text-sm font-medium leading-6"
                htmlFor="prompt"
              >
                Topic
              </label>
              <span className="text-xs text-muted-foreground">
                {prompt.length}/200 characters
              </span>
            </div>

            <Input
              className="h-12 text-base"
              id="prompt"
              maxLength={200}
              name="prompt"
              onChange={handleChange}
              placeholder="Enter a topic to generate note and flashcards..."
              type="text"
              value={prompt}
            />

            {validationError && (
              <p className="text-sm text-red-500">{validationError}</p>
            )}

            <Button
              className="mt-2 w-full py-6 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              disabled={loading || validationError !== ""}
              size="lg"
              type="submit"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </span>
              ) : (
                <span className="flex items-center gap-2 hover:cursor-pointer">
                  Generate Note
                  <WandSparkles className="h-5 w-5" />
                </span>
              )}
            </Button>

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-foreground/80">
                Try these examples:
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "Explain recursion in simple terms",
                  "Explain quantum computing basics",
                  "How does blockchain work?",
                  "What is machine learning?",
                ].map((example, index) => (
                  <button
                    className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm text-foreground/90 transition-all hover:bg-accent/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    key={index}
                    onClick={() => {
                      setPrompt(example);
                      setValidationError("");
                    }}
                    type="button"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Tips Section */}
      {!log && (
        <div className="mx-auto mt-12 max-w-2xl">
          <h3 className="mb-4 text-sm font-medium">Tips for best results:</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
              <span>Be specific with your topic for more focused notes</span>
            </li>
            <li className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
              <span>
                Try adding "for beginners" or "advanced" to adjust difficulty
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
