import { ArrowRight, Globe, Lock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Note } from '@/lib/db/schema';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200 flex flex-col h-full w-full">
      <Link className="flex flex-col flex-grow" href={`/notes/${note.id}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center">
            <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 min-h-[2.75rem] overflow-hidden">
              {note.title || 'Untitled Note'}
            </CardTitle>
          </div>
          <span className="inline-flex items-center text-xs text-muted-foreground">
            {note.public ? (
              <>
                <Globe className="h-3.5 w-3.5 mr-1" />
                Public
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5 mr-1" />
                Private
              </>
            )}
          </span>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
            {note.summary || 'No description provided.'}
          </p>
        </CardHeader>

        <CardContent className="flex-grow py-1 sm:py-2 px-4 sm:px-6">
          <div className="flex flex-wrap gap-1.5 mb-2 -ml-1.5 -mt-1.5">
            {note.keywords.map((kw) => (
              <Badge
                className="text-xs font-normal whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-0.75rem)]"
                key={kw.trim()}
                variant="secondary"
              >
                {kw.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-2 sm:pt-3 pb-3 sm:pb-4 mt-auto border-t px-4 sm:px-6">
          <div className="w-full flex justify-between items-center text-xs text-muted-foreground">
            <time dateTime={note.updatedAt.toISOString()}>
              {new Date(note.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span className="inline-flex items-center text-primary font-medium group-hover:underline">
              View <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
