import { BookOpen, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ActivityItem {
  date: string;
  notes: number;
  flashcards: number;
}

interface ActivityCardProps {
  activity: ActivityItem;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="hover:bg-accent/5 transition-colors border-border/50">
      <CardContent className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {activity.notes > 0 && (
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-background z-10">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            {activity.flashcards > 0 && (
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border-2 border-background z-0">
                <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium leading-none">
              {activity.notes > 0 && activity.flashcards > 0
                ? `Created ${activity.notes} note${activity.notes > 1 ? 's' : ''} and ${activity.flashcards} flashcard set${activity.flashcards > 1 ? 's' : ''}`
                : activity.notes > 0
                  ? `Created ${activity.notes} note${activity.notes > 1 ? 's' : ''}`
                  : `Created ${activity.flashcards} flashcard set${activity.flashcards > 1 ? 's' : ''}`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(activity.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
