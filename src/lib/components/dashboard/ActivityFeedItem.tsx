import { Calendar, CheckCircle2 } from 'lucide-react';

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
        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center shrink-0 text-primary">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <span className="font-medium truncate text-sm group-hover:text-primary transition-colors">
          Created {item.notes} note{item.notes !== 1 ? 's' : ''} and{' '}
          {item.flashcards} flashcard
          {item.flashcards !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
        <Calendar className="h-3 w-3" />
        {new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })}
      </div>
    </div>
  );
}
