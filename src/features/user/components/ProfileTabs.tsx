import { BookOpen, Clock, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { FlashcardSet } from '@/features/cards/types/flashcardSet';
import type { NoteMetadata } from '@/features/notes/types/noteMetadata';
import { UserActivityFeed } from './UserActivityFeed';
import { UserFlashcardsList } from './UserFlashcardsList';
import { UserNotesList } from './UserNotesList';

type ProfileTabsProps = {
  notes: NoteMetadata[];
  flashcards: (FlashcardSet & { cardCount: number })[];
  activity: { date: string; notes: number; flashcards: number }[];
  isOwnProfile: boolean;
  username: string;
};

export function ProfileTabs({
  notes,
  flashcards,
  activity,
  isOwnProfile,
  username,
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
          <UserNotesList
            isOwnProfile={isOwnProfile}
            notes={notes}
            username={username}
          />
        </TabsContent>

        <TabsContent value="flashcards">
          <UserFlashcardsList
            flashcards={flashcards}
            isOwnProfile={isOwnProfile}
            username={username}
          />
        </TabsContent>

        <TabsContent value="activity">
          <UserActivityFeed activity={activity} isOwnProfile={isOwnProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
