import { ArrowRight, FileText, Globe, Lock, Plus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { findNotesByUserId } from '@/features/notes/data-access/notes';
import { getCurrentUser } from '@/lib/auth';

export async function AllNotesWrapper() {
  const userId = await getCurrentUser();
  const notes = await findNotesByUserId(userId as string);

  if (!notes.length) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No notes yet
        </h3>
        <p className="text-muted-foreground mb-6">
          Get started by creating your first note
        </p>
        <Button asChild>
          <Link className="gap-2" href="/prompt">
            <Plus className="h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
            Your Knowledge Hub
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Organize, review, and master your learning journey
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto gap-2 mt-3 sm:mt-0">
          <Link className="justify-center sm:justify-start" href="/prompt">
            <Plus className="h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {notes.map((note) => (
          <Card
            className="group hover:shadow-md transition-all duration-200 flex flex-col h-full w-full"
            key={note.id}
          >
            <Link
              className="flex flex-col flex-grow"
              href={`/notes/${note.id}`}
            >
              <CardHeader className="pb-4 pt-5">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2 min-h-[2.75rem] overflow-hidden">
                    {note.title || 'Untitled Note'}
                  </CardTitle>
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
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
                  {note.summary || 'No description provided.'}
                </p>
              </CardHeader>

              <CardContent className="flex-grow py-1 sm:py-2 px-4 sm:px-6">
                <div className="flex flex-wrap gap-1.5 mb-2 -ml-1.5 -mt-1.5">
                  {note.keywords
                    .split(',')
                    .slice(0, 5)
                    .map((kw) => (
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
        ))}
      </div>
    </div>
  );
}
