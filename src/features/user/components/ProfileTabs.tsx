import { BookOpen, Clock, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FlashcardSet, Note } from '@/lib/db/schema';
import type { TotalCreations } from '@/user/types/totalCreations';
import { UserActivityFeed } from './UserActivityFeed';
import { UserFlashcardsList } from './UserFlashcardsList';
import { UserNotesList } from './UserNotesList';

interface ProfileTabsProps {
  notes: Note[];
  flashcards: (FlashcardSet & { cardCount: number })[];
  activity: { date: string; notes: number; flashcards: number }[];
  totalCreations: TotalCreations;
}

export function ProfileTabs({
  notes,
  flashcards,
  activity,
  totalCreations,
}: ProfileTabsProps) {
  return (
    <div className="flex-1">
      <Tabs className="w-full" defaultValue="notes">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="notes">
            <FileText className="h-4 w-4 mr-2" /> Notes
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <BookOpen className="h-4 w-4 mr-2" /> Flashcards
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Clock className="h-4 w-4 mr-2" /> Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes">
          <UserNotesList notes={notes} totalNotes={totalCreations.notes} />
        </TabsContent>

        <TabsContent value="flashcards">
          <UserFlashcardsList
            flashcards={flashcards}
            totalFlashcards={totalCreations.flashcards}
          />
        </TabsContent>

        <TabsContent value="activity">
          <UserActivityFeed activity={activity} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
