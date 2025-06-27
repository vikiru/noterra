'use client';

import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import mermaid from 'mermaid';
import { type RefObject, useEffect, useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const data = {
    note_contents: [
        {
            title: 'Table of Contents',
            heading_level: 1,
            content: `<section id="toc"><h1>Table of Contents</h1><ol><li><a href="#prerequisites">Prerequisite Knowledge</a></li><li><a href="#related-topics">Related Topics/Subtopics</a></li><li><a href="#introduction">Introduction to Depth-First Search</a></li><li><a href="#mindmap">Mindmap Overview</a></li><li><a href="#section-1">DFS Algorithm Explained</a></li><li><a href="#section-2">Implementation and Code Example</a></li><li><a href="#summary">Summary</a></li><li><a href="#challenge-questions">Challenge Questions</a></li><li><a href="#analogies">Analogies</a></li><li><a href="#glossary">Glossary</a></li><li><a href="#further-reading">Further Reading</a></li></ol></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Prerequisite Knowledge',
            heading_level: 1,
            content: `<section id="prerequisites"><h2>Prerequisite Knowledge</h2><p>Before diving into Depth-First Search (DFS), it's helpful to have a basic understanding of the following concepts:</p><ul><li><b>Graph Theory Basics:</b> Familiarity with graphs, nodes (vertices), and edges. Knowing the difference between directed and undirected graphs is also beneficial.</li><li><b>Data Structures:</b> Understanding of stacks and their LIFO (Last-In, First-Out) principle. Stacks are crucial for implementing DFS.</li><li><b>Recursion:</b> A solid grasp of recursion, as DFS is often implemented using recursive functions.</li><li><b>Basic Programming Concepts:</b> Familiarity with variables, loops, conditional statements, and functions in a programming language like Python or Java.</li></ul><p>Let's briefly touch on these topics:</p><ol><li><b>Graphs:</b> A graph is a collection of nodes connected by edges. For example, in a social network, people are nodes, and friendships are edges.</li><li><b>Stacks:</b> A stack is a data structure where you can only add or remove elements from the top. Think of a stack of plates – you can only take the top plate off.</li><li><b>Recursion:</b> Recursion is when a function calls itself. It's like a set of Russian dolls, each containing a smaller version of itself.</li></ol></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Related Topics/Subtopics',
            heading_level: 1,
            content: `<section id="related-topics"><h2>Related Topics/Subtopics</h2><div id="topic-1"><h3>Breadth-First Search (BFS)</h3><p>BFS is another graph traversal algorithm that explores all the neighbors of a node before moving to the next level of neighbors. Unlike DFS, BFS uses a queue instead of a stack.</p></div><div id="topic-2"><h3>Graph Traversal Algorithms</h3><p>DFS is one of the fundamental graph traversal algorithms. Others include BFS, Dijkstra's algorithm (for finding shortest paths), and topological sorting (for directed acyclic graphs).</p></div><div id="topic-3"><h3>Recursion and Iteration</h3><p>DFS can be implemented using both recursion and iteration. Understanding the differences and trade-offs between these approaches is important.</p></div><div id="topic-4"><h3>Tree Traversal</h3><p>DFS is often used for traversing trees, which are a special type of graph. Common tree traversal methods include pre-order, in-order, and post-order traversal, all of which are forms of DFS.</p></div></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Introduction to Depth-First Search',
            heading_level: 1,
            content: `<section id="introduction"><h2>Introduction to Depth-First Search</h2><p>Depth-First Search (DFS) is a fundamental algorithm used for traversing or searching tree or graph data structures. The algorithm starts at the root node (or an arbitrary node for graphs) and explores as far as possible along each branch before backtracking. This 'depth-first' approach means it goes deep into the graph before exploring its breadth.</p><p>Imagine you're exploring a maze. You pick a path and follow it until you reach a dead end. Then, you backtrack to the last intersection and try a different path. That's essentially how DFS works.</p><p>DFS can be implemented using recursion or an iterative approach with a stack. The recursive approach is often more intuitive and easier to understand, while the iterative approach provides more control over the traversal process.</p><p>Here's a simple analogy: Think of a family tree. DFS would start with the oldest ancestor and follow each descendant line as far as possible before moving to the next sibling. This way, you explore each family branch in depth.</p><p>DFS is used in a variety of applications, including:</p><ul><li><b>Pathfinding:</b> Finding a path between two nodes in a graph.</li><li><b>Topological Sorting:</b> Ordering nodes in a directed acyclic graph (DAG) such that for every directed edge from node A to node B, node A appears before node B in the ordering.</li><li><b>Cycle Detection:</b> Detecting cycles in a graph.</li><li><b>Connected Components:</b> Finding connected components in a graph.</li></ul></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Mindmap Overview',
            heading_level: 1,
            content: `<section id="mindmap"><h2>Mindmap Overview</h2><div id="mindmap-diagram-mindmap"><pre class="mermaid">mindmap\n  root((Depth-First Search))\n    Fundamentals\n      Traversal\n        Graphs\n        Trees\n        Backtracking\n      Recursion\n        Call Stack\n        Base Case\n        Recursive Step\n      Data Structures\n        Stack (LIFO)\n        Visited Set\n    Applications\n      Pathfinding\n        Maze Solving\n        Shortest Path\n      Cycle Detection\n        Directed Graphs\n        Undirected Graphs\n      Topological Sort\n        Dependency Resolution\n        Task Scheduling\n      Connected Components\n        Network Analysis\n        Image Processing\n    Implementations\n      Recursive\n        Simple Code\n        Stack Overflow Risk\n      Iterative\n        Explicit Stack\n        More Control\n    Complexity\n      Time Complexity\n        O(V + E)\n        Adjacency List\n      Space Complexity\n        O(V)\n        Call Stack/Stack\n</pre></div><p>The mindmap above provides a high-level overview of Depth-First Search (DFS). Starting from the root, 'Depth-First Search', we branch out into three main categories: Fundamentals, Applications, Implementations, and Complexity. The 'Fundamentals' branch covers the core concepts of DFS, including traversal techniques on graphs and trees, the importance of backtracking, and the role of recursion with its call stack, base case, and recursive step. It also highlights the essential data structures like the Stack (LIFO) and the Visited Set, which are crucial for the algorithm's operation.</p><p>The 'Applications' branch showcases the diverse use cases of DFS, such as pathfinding (e.g., maze-solving and finding shortest paths), cycle detection in both directed and undirected graphs, topological sorting for dependency resolution and task scheduling, and identifying connected components in network analysis and image processing.</p><p>The 'Implementations' branch discusses the two primary methods of implementing DFS: recursive and iterative. The recursive approach is noted for its simplicity but carries the risk of stack overflow, while the iterative approach uses an explicit stack and offers more control over the process.</p><p>Lastly, the 'Complexity' branch addresses the algorithm's performance characteristics, detailing the time complexity as O(V + E) when using an adjacency list and the space complexity as O(V) due to the call stack or stack data structure used.</p></section>`,
            includes_diagram: true,
            diagram_type: 'mindmap',
        },
        {
            title: 'DFS Algorithm Explained',
            heading_level: 1,
            content: `<section id="section-1"><h2>DFS Algorithm Explained</h2><p>The Depth-First Search (DFS) algorithm explores a graph or tree by going as deep as possible along each branch before backtracking. Here's a step-by-step explanation:</p><ol><li><b>Start at a Node:</b> Choose a starting node in the graph. This is often called the root node in trees.</li><li><b>Mark as Visited:</b> Mark the current node as visited to avoid revisiting it. This prevents infinite loops in cyclic graphs.</li><li><b>Explore Neighbors:</b> For each neighbor of the current node:<ul><li>If the neighbor has not been visited, recursively call DFS on the neighbor.</li></ul></li><li><b>Backtrack:</b> If all neighbors of the current node have been visited, backtrack to the previous node and continue exploring from there.</li></ol><p>Let's illustrate this with a simple graph:</p><div id="section-1-diagram-graph"><pre class="mermaid">graph TD\n    A[Start] --> B\n    A --> C\n    B --> D\n    B --> E\n    C --> F\n</pre></div><p>In this graph, let's say we start at node A. The DFS algorithm would proceed as follows:</p><ol><li>Visit A and mark it as visited.</li><li>Explore A's neighbors, B and C. Let's choose B first.</li><li>Visit B and mark it as visited.</li><li>Explore B's neighbors, D and E. Let's choose D first.</li><li>Visit D and mark it as visited.</li><li>D has no unvisited neighbors, so backtrack to B.</li><li>Explore E (the next neighbor of B).</li><li>Visit E and mark it as visited.</li><li>E has no unvisited neighbors, so backtrack to B, then to A.</li><li>Now, explore C's neighbor F.</li><li>Visit F and mark it as visited.</li><li>F has no unvisited neighbors, so backtrack to C, then to A.</li><li>All nodes have been visited, so the algorithm ends.</li></ol></section>`,
            includes_diagram: true,
            diagram_type: 'graph',
        },
        {
            title: 'Implementation and Code Example',
            heading_level: 1,
            content: `<section id="section-2"><h2>Implementation and Code Example</h2><p>Below is a Python implementation of the Depth-First Search (DFS) algorithm using both recursion and iteration:</p><div id="code-example-recursive"><h3>Recursive DFS Implementation</h3><pre><code>def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    return visited</code></pre></div><p>In this implementation, we define a function <code>dfs_recursive</code> that takes in a graph, a starting node, and a set of visited nodes. It marks the current node as visited and recursively explores its neighbors.</p><div id="code-example-iterative"><h3>Iterative DFS Implementation</h3><pre><code>def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node)
            stack.extend(neighbor for neighbor in graph[node] if neighbor not in visited)
    return visited</code></pre></div><p>The iterative implementation uses an explicit stack. Nodes are added to the stack and processed one by one. The algorithm continues until all nodes have been visited.</p></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Summary',
            heading_level: 1,
            content: `<section id="summary"><h2>Summary</h2><p>Depth-First Search (DFS) is a powerful and fundamental algorithm used for graph and tree traversal. It explores as far as possible along each branch before backtracking. The DFS algorithm can be implemented recursively or iteratively, and it has a wide range of applications, including pathfinding, cycle detection, topological sorting, and identifying connected components.</p><p>The key concepts to understand when working with DFS are:</p><ul><li><b>Traversal:</b> Visiting all nodes of a graph or tree.</li><li><b>Recursion:</b> DFS can be implemented using recursion or iteration.</li><li><b>Stack:</b> A stack is used to keep track of the nodes to visit in DFS.</li><li><b>Backtracking:</b> DFS involves backtracking when there are no more unvisited neighbors to explore.</li><li><b>Time Complexity:</b> The time complexity of DFS is O(V + E), where V is the number of vertices and E is the number of edges.</li><li><b>Space Complexity:</b> The space complexity is O(V), which accounts for the storage of visited nodes and the stack (in the iterative approach) or the call stack (in the recursive approach).</li></ul></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Challenge Questions',
            heading_level: 1,
            content: `<section id="challenge-questions"><h2>Challenge Questions</h2><p>Here are some challenge questions to test your understanding of Depth-First Search (DFS):</p><ol><li><b>Question 1:</b> What is the difference between Depth-First Search (DFS) and Breadth-First Search (BFS)?</li><li><b>Question 2:</b> How would you modify the DFS algorithm to find the shortest path between two nodes in an unweighted graph?</li><li><b>Question 3:</b> Can DFS be used to detect cycles in an undirected graph? If so, explain how.</li><li><b>Question 4:</b> What is the time complexity of DFS in a graph with an adjacency matrix representation? How does it differ from the adjacency list representation?</li></ol></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Analogies',
            heading_level: 1,
            content: `<section id="analogies"><h2>Analogies</h2><p>Here are some analogies to help understand the Depth-First Search (DFS) algorithm:</p><ul><li><b>Exploring a Maze:</b> Imagine you're lost in a maze. You choose a path and keep going until you can't go further. If you hit a dead end, you go back to the last intersection and try a different path. This is exactly how DFS works – it explores a path until it can go no further, then backtracks.</li><li><b>Family Tree:</b> DFS is like tracing your family tree. You start with the oldest ancestor and explore each branch as far as possible before moving to the next one. You go deeper into each branch before returning to explore others.</li><li><b>Library Search:</b> Searching for a specific book in a library can be like DFS. You start at one shelf and go through each book one by one. If you don't find it, you go back and try another shelf.</li></ul></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Glossary',
            heading_level: 1,
            content: `<section id="glossary"><h2>Glossary</h2><dl><dt>Graph:</dt><dd>A collection of nodes (vertices) and edges (connections between nodes).</dd><dt>Depth-First Search (DFS):</dt><dd>An algorithm for traversing or searching a graph/tree by exploring as far as possible along each branch before backtracking.</dd><dt>Stack:</dt><dd>A data structure that follows the LIFO (Last-In, First-Out) principle.</dd><dt>Recursion:</dt><dd>When a function calls itself in order to solve a problem.</dd><dt>Cycle:</dt><dd>A path in a graph that starts and ends at the same node without visiting any node more than once.</dd><dt>Visited Set:</dt><dd>A collection of nodes that have already been visited during DFS traversal to avoid revisiting them.</dd></dl></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
        {
            title: 'Further Reading',
            heading_level: 1,
            content: `<section id="further-reading"><h2>Further Reading</h2><ul><li><a href="https://en.wikipedia.org/wiki/Depth-first_search">Depth-First Search - Wikipedia</a></li><li><a href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/">Depth First Search (DFS) for a Graph - GeeksforGeeks</a></li><li><a href="https://www.coursera.org/learn/algorithms-part1">Algorithms, Part I (Coursera)</a></li></ul></section>`,
            includes_diagram: false,
            diagram_type: 'N/A',
        },
    ],
};

// TODO: redo this with shadcnui components.
const flashcards = [
    {
        question: 'What is Depth-First Search (DFS)?',
        answer: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    },
    {
        question:
            'What data structure is commonly used in the iterative implementation of DFS?',
        answer: 'A stack.',
    },
    {
        question: 'What is the time complexity of DFS?',
        answer: 'O(V + E), where V is the number of vertices and E is the number of edges.',
    },
    {
        question: 'Name one application of DFS.',
        answer: 'Pathfinding, cycle detection, topological sorting, or finding connected components.',
    },
    {
        question: 'What is backtracking in the context of DFS?',
        answer: 'The process of returning to a previous node after reaching a dead end or fully exploring a branch.',
    },
    {
        question: 'What is the main difference between DFS and BFS?',
        answer: 'DFS explores deeply along each branch, while BFS explores all neighbors at the current level before moving to the next level.',
    },
    {
        question: 'How does recursion relate to DFS?',
        answer: 'DFS is often implemented using recursive functions.',
    },
    {
        question: 'What is a graph in the context of DFS?',
        answer: 'A data structure consisting of nodes (vertices) and edges that connect them.',
    },
    {
        question: "What is the purpose of marking nodes as 'visited' in DFS?",
        answer: 'To avoid revisiting nodes and prevent infinite loops in cyclic graphs.',
    },
    {
        question: 'Explain the LIFO principle in the context of DFS.',
        answer: 'LIFO (Last-In, First-Out) is the principle followed by the stack data structure, where the last element added is the first one removed, which is crucial for the iterative implementation of DFS.',
    },
    {
        question: 'What is a node (or vertex) in a graph?',
        answer: 'A fundamental unit in a graph, representing an entity or object.',
    },
    {
        question: 'What is an edge in a graph?',
        answer: 'A connection between two nodes in a graph.',
    },
];

function combineAndSanitizeNoteContent(noteContent: any) {
    let combinedHtml = '';

    noteContent.forEach((content: { content: string }) => {
        combinedHtml += content.content;
    });

    const sanitizedHtml = DOMPurify.sanitize(combinedHtml);
    return sanitizedHtml;
}

const keywords = [
    'Depth-First Search',
    'DFS',
    'Graph Traversal',
    'Recursion',
    'Stack',
    'Algorithm',
];
export default function Page() {
    const noteSection = useRef<HTMLElement>(null);
    const safeHtml = combineAndSanitizeNoteContent(data.note_contents || []);

    useEffect(() => {
        if (noteSection !== null) {
            mermaid.initialize({ startOnLoad: true });
            mermaid.contentLoaded();

            const mermaidElements = document.querySelectorAll('.mermaid');
            mermaidElements.forEach((element) => {
                const parent = element.parentElement;
                parent?.classList.add('not-prose');
            });

            updateTOC(noteSection);
        }
    }, [safeHtml]);

    return (
        <div className="flex min-h-screen grow flex-col overflow-hidden rounded-lg bg-white p-6 text-black shadow-lg">
            <div>
                <h3 className="">Notes</h3>
            </div>

            <div className="flex justify-between">
                <div className="rounded-lg bg-gray-300 sm:w-1/4 lg:flex lg:w-1/4">
                    <ScrollArea className="h-[90vh] w-full overflow-x-auto overflow-y-auto rounded-lg bg-gray-300 p-4 shadow-inner">
                        <div className="flex flex-col gap-1">
                            {/* Recursion (unstyled) */}
                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recursion
                                    </CardTitle>
                                    <CardDescription>
                                        Understanding the concept of functions
                                        calling themselves.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {keywords.map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full dark:bg-gray-100">
                                <CardHeader>
                                    <CardTitle className="text-lg text-black">
                                        Base Case
                                    </CardTitle>
                                    <CardDescription>
                                        The termination condition for a
                                        recursive function.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'termination',
                                            'condition',
                                            'stopping',
                                            'exit',
                                            'end',
                                            'base case',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recursive Call
                                    </CardTitle>
                                    <CardDescription>
                                        When a function calls itself to solve a
                                        smaller instance of the problem.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'self-call',
                                            'problem',
                                            'solution',
                                            'recursive',
                                            'function',
                                            'stack',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recursion Depth
                                    </CardTitle>
                                    <CardDescription>
                                        The level of nested recursive calls made
                                        by a function.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'depth',
                                            'call-stack',
                                            'nested',
                                            'recursion',
                                            'level',
                                            'performance',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Infinite Recursion
                                    </CardTitle>
                                    <CardDescription>
                                        When a recursive function fails to reach
                                        the base case, leading to an infinite
                                        loop.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'infinite',
                                            'loop',
                                            'failure',
                                            'stack overflow',
                                            'endless',
                                            'base case',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Tail Recursion
                                    </CardTitle>
                                    <CardDescription>
                                        A form of recursion where the recursive
                                        call is the last operation in the
                                        function.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'tail call',
                                            'optimization',
                                            'last call',
                                            'efficiency',
                                            'memory',
                                            'function',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recursion Tree
                                    </CardTitle>
                                    <CardDescription>
                                        A diagram that visualizes the recursive
                                        calls made by a function.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'tree',
                                            'visualization',
                                            'calls',
                                            'branches',
                                            'diagram',
                                            'structure',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recursion vs Iteration
                                    </CardTitle>
                                    <CardDescription>
                                        Comparing recursion with looping
                                        techniques like for/while loops for
                                        solving problems.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'iteration',
                                            'looping',
                                            'comparison',
                                            'efficiency',
                                            'stack',
                                            'recursive',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Divide and Conquer
                                    </CardTitle>
                                    <CardDescription>
                                        A strategy where recursion is used to
                                        break down problems into smaller
                                        subproblems.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'divide',
                                            'conquer',
                                            'subproblems',
                                            'recursive',
                                            'algorithm',
                                            'merge',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Memoization
                                    </CardTitle>
                                    <CardDescription>
                                        A technique used to optimize recursive
                                        functions by storing results of
                                        expensive function calls.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'optimization',
                                            'caching',
                                            'performance',
                                            'memo',
                                            'recursion',
                                            'lookup',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="prose w-full">
                                <CardHeader>
                                    <CardTitle className="text-lg">
                                        Recursive Data Structures
                                    </CardTitle>
                                    <CardDescription>
                                        Data structures like trees and graphs
                                        that are inherently recursive in nature.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="-mt-4 flex w-full flex-wrap gap-1">
                                        {[
                                            'data structures',
                                            'tree',
                                            'graph',
                                            'recursive',
                                            'nodes',
                                            'edges',
                                        ].map((keyword, index) => {
                                            return (
                                                <Badge
                                                    className="capitalize"
                                                    key={index}
                                                >
                                                    {keyword}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                </div>
                <div className="flex justify-end overflow-hidden rounded-lg bg-gray-300 lg:w-3/4">
                    <ScrollArea className="h-[90vh] w-full overflow-x-auto overflow-y-auto rounded-lg bg-gray-50 p-4 shadow-inner">
                        <section
                            className="container-xl prose sm:prose-sm md:prose-base lg:prose-lg mx-4 w-full 2xl:max-w-[95%]"
                            id="note"
                            ref={noteSection}
                        >
                            {parse(safeHtml)}
                        </section>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

// TODO: finish prompt cleanup
// TODO: add google books + youtube data, maybe medium api and some api for course data
// TODO: create utils for combining, sanitizing, updating toc, convert md -> html, html -> md, json -> html, etc
// TODO: create a simple server action for gemini (add auth later).
// TODO: Auth with clerk later as well.
// TODO: setup tip tap full page editor, user should be able to edit content, title, any other relevant data.
// TODO: setup full page note view, flashcard view per note, with edit/add forms, delete action with alert + toasts
// TODO: flashcard quizlike component? (optional)
// TODO: export .md, .pdf, .txt, .zip etc format handling
// TODO: pdf viewer and pdf downloading
// TODO: toc sidebar, history, local save one note at a time, undo/redo?, tiptap toolbar
// TODO: homepage, user dashboard, profile page, account settings, sign up/login, note creation/prompt page (later on add customization to prompt)
// TODO: share notes, mark as public/private, public note library - view only for now, option to view, preview pdf/dl and optionally share flashcards.
// TODO: generate public random uuid/ids for user, notes, flashcards used throughout app to keep private ids secure.
// TODO: crud for notes, flashcard. schema/types/prisma model
// TODO: after simple frontend + actions and backend setup, feat by feat. ensure responsiveness for tailwind breakpoints only for now.
function updateTOC(ref: RefObject<HTMLElement | null>) {
    if (!ref.current) return;
    const currentRef = ref.current;
    const sections = currentRef.querySelectorAll('section');
    const tocSection = currentRef.querySelector('#toc');
    let toc = '';
    sections.forEach((section) => {
        const headings = Array.from(
            section.querySelectorAll('h1, h2, h3, h4, h5, h6'),
        );
        headings.sort((a, b) => {
            const levelA = parseInt(a.tagName[1], 10);
            const levelB = parseInt(b.tagName[1], 10);
            return levelA - levelB;
        });
        const topLevelHeading = headings[0];
        const headingText = topLevelHeading.textContent
            ?.trim()
            .toLowerCase()
            .replace(/\s+/g, '-');
        if (headingText) {
            topLevelHeading.id = headingText;
            toc += `<li><a href="#${topLevelHeading.textContent?.toLowerCase().replace(' ', '-')}">${topLevelHeading.textContent}</a>`;
            toc += `<ol>`;
        }

        headings.slice(1).forEach((heading) => {
            const headingText = heading.textContent
                ?.trim()
                .toLowerCase()
                .replace(/\s+/g, '-');
            if (headingText) {
                heading.id = headingText;
                toc += `<li><a href="#${headingText}">${heading.textContent}</a></li>`;
            }
        });
        toc += '</ol></li>';
    });
    const tocList = tocSection?.querySelector('ol');
    if (tocList) {
        tocList.innerHTML = toc;
    }
}
