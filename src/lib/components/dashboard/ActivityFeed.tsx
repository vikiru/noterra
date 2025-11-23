import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityFeedItem } from '@/lib/components/dashboard/ActivityFeedItem';
import { EmptyActivityState } from '@/lib/components/dashboard/EmptyActivityState';

type ActivityItem = {
  date: string;
  notes: number;
  flashcards: number;
};

type ActivityFeedProps = {
  activityOverview: ActivityItem[];
};

export async function ActivityFeed({ activityOverview }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">Activity Feed</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {activityOverview.length === 0 ? (
            <EmptyActivityState />
          ) : (
            activityOverview.map((item: ActivityItem) => (
              <ActivityFeedItem item={item} key={item.date} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
