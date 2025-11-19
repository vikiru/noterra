import { Calendar, CheckCircle2 } from 'lucide-react';
import { DateTime } from 'luxon';

type ActivityItem = {
  date: string;
  notes: number;
  flashcards: number;
};

type ActivityFeedItemProps = {
  item: ActivityItem;
};

export function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group">
      <div className="flex items-center gap-3 overflow-hidden">
        {item.notes > 0 || item.flashcards > 0 ? (
          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0 text-primary">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        ) : (
          <div className="h-8 w-8 rounded bg-muted/10 flex items-center justify-center shrink-0 text-muted">
            <Calendar className="h-4 w-4" />
          </div>
        )}
        {item.notes > 0 || item.flashcards > 0 ? (
          <span className="font-medium truncate text-sm group-hover:text-primary transition-colors">
            Created {item.notes} note{item.notes !== 1 ? 's' : ''} and{' '}
            {item.flashcards} flashcard
            {item.flashcards !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="font-medium truncate text-sm group-hover:text-primary transition-colors">
            No activity recorded on this day
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
        <Calendar className="h-3 w-3" />
        {DateTime.fromISO(item.date, { zone: 'local' }).toFormat('MMM d')}
      </div>
    </div>
  );
}
