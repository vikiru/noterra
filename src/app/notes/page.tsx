import {
    Book,
    BookMarked,
    BookOpen,
    Clock,
    Dot,
    NotebookText,
    Search,
    SeparatorHorizontal,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AllNotesPage() {
    return (
        <section
            className="w-full flex flex-col flex-1 min-h-screen dark:bg-gray-600"
            id="all-notes"
        >
            <div className="mx-4 sm:text-left lg:max-w-3xl">
                <h2 className="text-center sm:text-left font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
                    Your Knowledge Hub
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-light mt-1 sm:ml-0 ml-4">
                    Explore and review your notes in one place.
                </p>
            </div>
            <div className="mx-2 my-4">
                <Input placeholder="Search notes" />
            </div>
            <ScrollArea className="h-[80vh] lg:h-[75vh] 2xl:h-[70vh] py-2 rounded-md w-full overscroll-contain max-h-screen overflow-y-auto">
                <div className="mx-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {/* Note Card*/}
                    <Card className="hover:shadow-md transition-shadow duration-200 ease-in-out">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                                    <h4 className="font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                                        Recursion: An Alternative to Iterative
                                        Approach
                                    </h4>
                                    <time
                                        className="flex items-center gap-1.5 mt-2 sm:mt-0 text-gray-500 dark:text-gray-400 text-sm font-medium"
                                        dateTime="2025-07-05"
                                    >
                                        <Clock aria-hidden="true" size={16} />
                                        Jul 5, 2025
                                    </time>
                                </div>
                            </CardTitle>

                            <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed mt-1">
                                <p>
                                    Recursion is a programming technique where a
                                    function calls itself to solve smaller
                                    instances of a problem until reaching a base
                                    case.
                                </p>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-wrap gap-2 mt-3 leading-relaxed">
                            {[
                                'Recursion',
                                'Algorithm',
                                'Base Case',
                                'Stack',
                                'Iteration',
                                'Divide & Conquer',
                            ].map((tag) => (
                                <Badge
                                    aria-label={`Tag: ${tag}`}
                                    className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                                    key={tag}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </CardContent>

                        <CardFooter className="mt-4">
                            <CardAction>
                                <Button
                                    aria-label="View note details"
                                    className="flex items-center gap-2 cursor-pointer"
                                    variant="outline"
                                >
                                    <BookOpen aria-hidden="true" size={16} />
                                    View
                                </Button>
                            </CardAction>
                        </CardFooter>
                    </Card>
                </div>
            </ScrollArea>
        </section>
    );
}
