import { Flashcard } from '@/types';

export const flashcards: Flashcard[] = [
    {
        id: '876a4b4e-0546-4c53-b0a9-372cfb6aecd4',
        noteId: 'f2778ebf-5f94-49cb-875f-815107845f9b',
        question: 'What is Depth-First Search (DFS)?',
        answer: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
        createdAt: new Date('2025-07-18T20:30:36.851Z'),
        updatedAt: new Date('2025-07-18T20:30:36.851Z'),
    },
    {
        id: '7a8801e5-01d0-4d92-b6bd-cd4a25fe9bba',
        noteId: 'f2778ebf-5f94-49cb-875f-815107845f9b',
        question:
            'What data structure is commonly used in the iterative implementation of DFS?',
        answer: 'A stack.',
        createdAt: new Date('2025-07-18T20:31:36.852Z'),
        updatedAt: new Date('2025-07-18T20:31:36.852Z'),
    },
    {
        id: 'bbf90473-c6b4-4702-9a63-a87cdda6ebf6',
        noteId: 'f2778ebf-5f94-49cb-875f-815107845f9b',
        question: 'What is the time complexity of DFS?',
        answer: 'O(V + E), where V is the number of vertices and E is the number of edges.',
        createdAt: new Date('2025-07-18T20:32:36.852Z'),
        updatedAt: new Date('2025-07-18T20:32:36.852Z'),
    },
    {
        id: '29bc2481-7859-4567-8d61-d1ae9b62f2c6',
        noteId: 'f2778ebf-5f94-49cb-875f-815107845f9b',
        question: 'Name one application of DFS.',
        answer: 'Pathfinding, cycle detection, topological sorting, or finding connected components.',
        createdAt: new Date('2025-07-18T20:33:36.852Z'),
        updatedAt: new Date('2025-07-18T20:33:36.852Z'),
    },
    {
        id: 'f6d80f36-6900-40a2-a81a-00f8f063ad63',
        noteId: 'f2778ebf-5f94-49cb-875f-815107845f9b',
        question: 'What is backtracking in the context of DFS?',
        answer: 'The process of returning to a previous node after reaching a dead end or fully exploring a branch.',
        createdAt: new Date('2025-07-18T20:34:36.852Z'),
        updatedAt: new Date('2025-07-18T20:34:36.852Z'),
    },
];
