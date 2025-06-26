'use client';

import { useUser } from '@clerk/nextjs';
import { Book, Columns2, Dot, Notebook, Tag } from 'lucide-react';
import { ExampleChart } from '@/components/ExampleChart';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PublicProfilePage() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return <div className="p-10">Loading...</div>;

    return (
        <section
            id="profile"
            className="bg-background flex sm:flex-col lg:flex-row"
        >
            <div className="sm:w-full lg:w-1/3">
                <Card className="w-full dark:bg-gray-100">
                    <CardHeader>
                        <div className="">
                            <img
                                src={user?.imageUrl}
                                className="h-32 w-32 rounded-full"
                            />
                        </div>
                        <CardTitle className="text-2xl 2xl:text-3xl dark:text-zinc-900">
                            {user?.firstName} {user?.lastName}
                        </CardTitle>
                        <CardDescription className="-mt-1 lg:text-lg dark:text-zinc-500">
                            @{user?.username}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mt-4 max-w-2xl">
                        <p className="leading-relaxed">
                            Curious mind exploring tech, design, and creativity.
                            Always learning, building, and striving to make a
                            positive impact.
                        </p>
                        <p className="mt-1 text-zinc-500">
                            Joined Mar 21, 2000
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="sm:mx-auto sm:mt-2 sm:w-full lg:mx-4 lg:mt-0 lg:w-2/3">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                            value="overview"
                            className="dark:text-foreground data-[state=active]:text-white dark:data-[state=active]:text-white"
                        >
                            <Columns2 size={15} />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="notes"
                            className="flex items-center data-[state=active]:text-white dark:text-white dark:data-[state=active]:text-white"
                        >
                            <Notebook size={15} />
                            Notes
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <ExampleChart />
                    </TabsContent>
                    <TabsContent value="notes" className="mx-2">
                        <ScrollArea className="flex w-full rounded-md border sm:h-[40vh] lg:h-[79vh] 2xl:h-[85vh]">
                            <div className="flex flex-col gap-1">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Recursion</CardTitle>
                                            <div className="flex min-w-[10rem] items-center justify-end">
                                                <p className="text-center text-xs text-zinc-400 lg:text-sm">
                                                    Created March 30, 2025
                                                </p>
                                            </div>
                                        </div>
                                        <CardDescription>
                                            Recursion is a programming technique
                                            where a function calls itself to
                                            solve smaller instances of a problem
                                            until reaching a base case.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="-mt-5 space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-wrap gap-2 capitalize">
                                                <Badge>function</Badge>
                                                <Badge>recursion</Badge>
                                                <Badge>algorithm</Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="jusify-between flex items-center gap-1">
                                                <Book
                                                    size={15}
                                                    className="lg:text-lg"
                                                />
                                                <span className="text-xs text-zinc-400 lg:text-sm">
                                                    20
                                                </span>
                                            </div>
                                            <Dot
                                                size={15}
                                                className="-mx-2 lg:-mx-1"
                                            />
                                            <p className="text-xs text-zinc-400 lg:text-sm">
                                                Updated on April 12, 2025
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>
                                                Dynamic Programming
                                            </CardTitle>
                                            <p className="text-xs whitespace-nowrap text-zinc-400 lg:text-sm">
                                                Created April 5, 2025
                                            </p>
                                        </div>
                                        <CardDescription>
                                            Dynamic Programming is a method for
                                            solving problems by breaking them
                                            down into simpler subproblems and
                                            storing their solutions to avoid
                                            redundant work.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="-mt-5 space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-wrap gap-2 capitalize">
                                                <Badge>algorithm</Badge>
                                                <Badge>
                                                    dynamic programming
                                                </Badge>
                                                <Badge>optimization</Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="jusify-between flex items-center gap-1">
                                                <Book
                                                    size={15}
                                                    className="lg:text-lg"
                                                />
                                                <span className="text-xs text-zinc-400 lg:text-sm">
                                                    15
                                                </span>
                                            </div>
                                            <Dot
                                                size={15}
                                                className="-mx-2 lg:-mx-1"
                                            />
                                            <p className="text-xs text-zinc-400 lg:text-sm">
                                                Updated on April 6, 2025
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>
                                                Greedy Algorithms
                                            </CardTitle>
                                            <p className="text-xs whitespace-nowrap text-zinc-400 lg:text-sm">
                                                Created March 30, 2025
                                            </p>
                                        </div>
                                        <CardDescription>
                                            Greedy algorithms make the locally
                                            optimal choice at each stage, hoping
                                            to find a global optimum.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="-mt-5 space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-wrap gap-2 capitalize">
                                                <Badge>algorithm</Badge>
                                                <Badge>greedy</Badge>
                                                <Badge>optimization</Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="jusify-between flex items-center gap-1">
                                                <Book
                                                    size={15}
                                                    className="lg:text-lg"
                                                />
                                                <span className="text-xs text-zinc-400 lg:text-sm">
                                                    18
                                                </span>
                                            </div>
                                            <Dot
                                                size={15}
                                                className="-mx-2 lg:-mx-1"
                                            />
                                            <p className="text-xs text-zinc-400 lg:text-sm">
                                                Updated on April 1, 2025
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Graph Theory</CardTitle>
                                            <p className="text-xs whitespace-nowrap text-zinc-400 lg:text-sm">
                                                Created March 28, 2025
                                            </p>
                                        </div>
                                        <CardDescription>
                                            Graph Theory studies graphs, which
                                            are mathematical structures used to
                                            model pairwise relations between
                                            objects.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="-mt-5 space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-wrap gap-2 capitalize">
                                                <Badge>graph</Badge>
                                                <Badge>theory</Badge>
                                                <Badge>algorithm</Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="jusify-between flex items-center gap-1">
                                                <Book
                                                    size={15}
                                                    className="lg:text-lg"
                                                />
                                                <span className="text-xs text-zinc-400 lg:text-sm">
                                                    25
                                                </span>
                                            </div>
                                            <Dot
                                                size={15}
                                                className="-mx-2 lg:-mx-1"
                                            />
                                            <p className="text-xs text-zinc-400 lg:text-sm">
                                                Updated on March 30, 2025
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>
                                                Sorting Algorithms
                                            </CardTitle>
                                            <p className="text-xs whitespace-nowrap text-zinc-400 lg:text-sm">
                                                Created March 20, 2025
                                            </p>
                                        </div>
                                        <CardDescription>
                                            Sorting algorithms are used to
                                            arrange the elements of a list or
                                            array in a specific order (ascending
                                            or descending).
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="-mt-5 space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-wrap gap-2 capitalize">
                                                <Badge>algorithm</Badge>
                                                <Badge>sorting</Badge>
                                                <Badge>data structure</Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="jusify-between flex items-center gap-1">
                                                <Book
                                                    size={15}
                                                    className="lg:text-lg"
                                                />
                                                <span className="text-xs text-zinc-400 lg:text-sm">
                                                    10
                                                </span>
                                            </div>
                                            <Dot
                                                size={15}
                                                className="-mx-2 lg:-mx-1"
                                            />
                                            <p className="text-xs text-zinc-400 lg:text-sm">
                                                Updated on March 25, 2025
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
