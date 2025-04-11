'use client';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { WandSparkles } from 'lucide-react';

export default function PromptPage() {
    return (
        <section
            id="prompt-page"
            className="flex min-h-screen flex-col items-center justify-center dark:bg-zinc-900"
        >
            <div className="-mt-20 flex flex-col items-center justify-center">
                <h2 className="my-4 bg-gradient-to-tr from-rose-500 via-orange-400 to-yellow-300 bg-clip-text py-2 tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                    Bright Ideas Start Here
                </h2>
                <p className="-mt-4 mb-4 text-lg tracking-wider text-gray-300 lg:text-xl">
                    Generate detailed notes and flashcards on any topic!
                </p>
            </div>

            <div className="flex w-full items-center space-x-2 py-2 sm:max-w-xl lg:max-w-4xl">
                <Input
                    type="text"
                    placeholder="Enter a topic here"
                    className="lg:h-10 lg:text-lg"
                />
                <Button
                    type="submit"
                    className="hover:cursor-pointer lg:text-base"
                    size={'lg'}
                >
                    Generate
                    <WandSparkles size={24} />
                </Button>
            </div>

            <div className="mx-4 mt-4 flex flex-wrap justify-center gap-2">
                <div className="mx-4 mt-4 flex flex-wrap justify-center gap-2">
                    <div className="text-md rounded-lg bg-zinc-800 px-6 py-2 sm:px-3 sm:py-2 sm:text-base">
                        <h5>Explain Recursion</h5>
                    </div>
                    <div className="rounded-lg bg-zinc-800 px-6 py-2 sm:px-3 sm:py-2 sm:text-base">
                        <h5>Explain Photosynthesis</h5>
                    </div>
                    <div className="rounded-lg bg-zinc-800 px-6 py-2 sm:px-3 sm:py-2 sm:text-base">
                        <h5>Explain the History of the Internet</h5>
                    </div>
                    <div className="rounded-lg bg-zinc-800 px-6 py-2 sm:px-3 sm:py-2 sm:text-base">
                        <h5>Explain Supply and Demand</h5>
                    </div>
                </div>
            </div>
        </section>
    );
}
