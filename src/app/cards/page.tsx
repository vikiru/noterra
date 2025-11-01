import { ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { findCardsByUserId } from '@/features/cards/data-access/flashcard';
import { getCurrentUser } from '@/lib/auth';

const SET_NAMES = [
  'Machine Learning Basics',
  'Web Development Fundamentals',
  'Data Structures & Algorithms',
  'System Design Patterns',
  'JavaScript Mastery',
  'Cloud Computing Concepts',
  'DevOps Essentials',
  'UI/UX Principles',
  'Database Design',
  'Networking 101',
];

const SET_DESCRIPTIONS = [
  'Master the essential concepts, theories, and terminology that form the foundation of this subject area. Perfect for beginners and those looking to strengthen their core understanding.',
  "Build a solid foundation with these fundamental building blocks. Covers the key elements you'll need to understand more complex topics.",
  'Practical patterns and implementations used by professionals. Includes real-world examples and best practices for applying these patterns effectively.',
  "Key principles that guide decision-making and problem-solving in this field. Learn the 'why' behind common practices and how to apply them.",
  'Dive into sophisticated techniques and patterns that separate beginners from experts. Includes optimization strategies and advanced methodologies.',
  'A comprehensive look at the architecture and underlying principles. Understand how different components interact and work together in complex systems.',
  'The essential tools and workflows used by professionals. Streamline your process and improve efficiency with these proven methods.',
  'A deep dive into design thinking and methodology. Learn how to approach problems creatively and develop innovative solutions.',
  'Advanced models and optimization techniques. Perfect for those looking to take their skills to the next level.',
  'In-depth exploration of protocols and security measures. Essential knowledge for anyone working with data and systems.',
];

const getRandomColor = () => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-amber-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

function groupCardsByNote(cards: any[]) {
  const groups = cards.reduce((groups, card, index) => {
    const noteId = card.noteId || `set-${index}`;
    if (!groups[noteId]) {
      const randomIndex = Math.floor(Math.random() * SET_NAMES.length);
      groups[noteId] = {
        noteId,
        noteTitle: SET_NAMES[randomIndex] || 'Study Set',
        description: SET_DESCRIPTIONS[randomIndex] || 'Flashcard collection',
        color: getRandomColor(),
        createdAt: card.createdAt || new Date().toISOString(),
        updatedAt: card.updatedAt || new Date().toISOString(),
        cards: [],
      };
    }
    groups[noteId].cards.push(card);
    return groups;
  }, {});

  return Object.values(groups).sort(
    (a: any, b: any) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

// TODO: remove the static text/fns, sep components.
// TODO: create /notes/id/cards page to show cards for a note, update the links to point to that.
// TODO: create fn to fetch note id, description, title, flashcard count.
// TODO: create review page to review cards.

export default async function AllCardsPage() {
  const userId = await getCurrentUser();
  const cards = await findCardsByUserId(userId as string);
  const noteGroups = groupCardsByNote(cards);
  const noteSets = Object.values(noteGroups);

  if (!cards.length) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No flashcard sets found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by creating flashcards from your notes.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/notes">
              View Notes <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Flashcards</h1>
          <p className="text-muted-foreground mt-2">
            Review and study your flashcard collections
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {noteSets.map((set: any) => (
          <div className="group relative flex flex-col h-full" key={set.noteId}>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 blur transition-all duration-300 group-hover:opacity-100"></div>
            <Card className="relative flex flex-col h-full overflow-hidden transition-all duration-300 group-hover:border-primary/50 hover:shadow-md">
              <div className={`h-2 w-full ${set.color}`}></div>
              <div className="flex flex-col flex-1 p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold leading-tight line-clamp-2">
                        {set.noteTitle}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {set.description}
                      </p>
                    </div>
                    <Badge
                      className="flex-shrink-0 ml-2 border-primary/20 bg-primary/5 text-xs font-medium h-6"
                      variant="outline"
                    >
                      {set.cards.length}{' '}
                      {set.cards.length === 1 ? 'card' : 'cards'}
                    </Badge>
                  </div>
                </CardHeader>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-xs">
                        {new Date(set.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="group/button relative h-8 text-xs"
                      size="sm"
                      variant="outline"
                    >
                      <Link href={`/cards/set/${set.noteId}`}>
                        Study
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
