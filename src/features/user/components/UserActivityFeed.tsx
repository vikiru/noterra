import { Clock } from 'lucide-react';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { ActivityCard } from './ActivityCard';

type ActivityItem = {
  date: string;
  notes: number;
  flashcards: number;
};

type UserActivityFeedProps = {
  activity: ActivityItem[];
};

export function UserActivityFeed({ activity }: UserActivityFeedProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Activity</h3>
          <p className="text-sm text-muted-foreground">
            Recent activity on notes and flashcards
          </p>
        </div>
      </div>

      {activity.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg border-dashed">
          <div className="p-3 rounded-full bg-muted mb-3">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            No recent activity
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Recent actions will appear here.
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {activity.map((item) => (
              <ActivityCard activity={item} key={item.date} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
