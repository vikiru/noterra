import { Book, Dot } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function FlashcardsPage() {
    return (
        <section
            className="flex min-h-screen flex-col dark:bg-zinc-900"
            id="flashcards-page"
        >
            <div className="mx-4 mt-2">
                <h2>Your Flashcards</h2>
                <p className="dark:text-gray-400">
                    Browse all of your flashcards
                </p>
            </div>
            <div className="mx-2 my-4">
                <Input placeholder="Search flashcards" />
            </div>
            <div className="mx-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex min-h-5 items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                                <Badge>algorithm</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex min-h-6 items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Recursion</CardTitle>
                        <CardDescription>
                            Recursion is a programming technique where a
                            function calls itself to solve smaller instances of
                            a problem until reaching a base case.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-wrap gap-2 capitalize">
                                <Badge>function</Badge>
                                <Badge>recursion</Badge>
                                <Badge>algorithm</Badge>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center gap-2">
                            <Book size={20} />
                            20
                            <Dot className="-mx-2 lg:-mx-1" size={15} />
                            <span className="text-sm">
                                Created on Apr 5, 2025
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
