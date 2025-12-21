import { History } from 'lucide-react';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/lib/components/ui/empty';

export function EmptyActivityState() {
  return (
    <div className="py-6">
      <Empty>
        <EmptyMedia>
          <History className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No recent activity</EmptyTitle>
          <EmptyDescription>Your learning activity for the last 7 days will show up here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
