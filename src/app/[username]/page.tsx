import {
  BookOpen,
  CalendarDays,
  Clock,
  FileText,
  MapPin,
  Plus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  findUserByUsername,
  findUserTotalCreations,
} from '@/features/user/data-access/user';
import { ScrollArea } from '@/lib/components/ui/scroll-area';

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const user = await findUserByUsername(username as string);
  const stats = await findUserTotalCreations(user.clerkId as string);

  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() ||
    'U';
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Card */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Card className="sticky top-8">
            <div className="p-6 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-black dark:border-white">
                <AvatarFallback className="text-2xl bg-primary/10">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-muted-foreground">@{user.username}</p>

              {user.bio && (
                <p className="mt-4 text-sm text-muted-foreground">{user.bio}</p>
              )}

              <div className="mt-6 space-y-3 text-left">
                {user.country && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{user.country}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Member since {memberSince}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.notes}</p>
                  <p className="text-sm text-muted-foreground">Notes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.flashcards}</p>
                  <p className="text-sm text-muted-foreground">Flashcards</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Tabs */}
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

            <TabsContent className="space-y-3" value="notes">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Your Notes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stats.notes} notes
                  </p>
                </div>
                <Button
                  className="gap-1 h-8 text-black hover:text-black"
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Note</span>
                </Button>
              </div>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {[
                    {
                      id: '1',
                      title: 'Introduction to React Hooks',
                      content:
                        'Hooks allow you to use state and other React features without writing a class...',
                      updatedAt: new Date('2025-10-28'),
                      tags: ['react', 'hooks', 'frontend'],
                    },
                    {
                      id: '2',
                      title: 'TypeScript Best Practices',
                      content:
                        'TypeScript provides static typing which helps catch errors early...',
                      updatedAt: new Date('2025-10-25'),
                      tags: ['typescript', 'programming'],
                    },
                  ].map((note) => (
                    <Card
                      className="hover:bg-accent/10 transition-colors cursor-pointer border-border/50"
                      key={note.id}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5 flex-shrink-0">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="text-sm font-medium text-black dark:text-white leading-tight">
                                {note.title}
                              </h4>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {note.updatedAt.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {note.content}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {note.tags.map((tag) => (
                                <Badge
                                  className="text-[11px] font-normal text-muted-foreground"
                                  key={tag}
                                  variant="outline"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent className="space-y-3" value="flashcards">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Your Flashcard Sets
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stats.flashcards} cards across 2 sets
                  </p>
                </div>
              </div>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {[
                    {
                      id: '1',
                      title: 'JavaScript Basics',
                      description: 'Core JavaScript concepts and syntax',
                      cardCount: 12,
                      lastStudied: '2 days ago',
                      mastery: 75,
                    },
                    {
                      id: '2',
                      title: 'CSS Grid Layout',
                      description: 'Mastering CSS Grid for modern layouts',
                      cardCount: 8,
                      lastStudied: '1 week ago',
                      mastery: 45,
                    },
                  ].map((set) => (
                    <Card
                      className="hover:bg-accent/10 transition-colors cursor-pointer border-border/50"
                      key={set.id}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary mt-0.5 flex-shrink-0">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="text-sm font-medium text-black dark:text-white leading-tight">
                                {set.title}
                              </h4>
                              <Badge
                                className="text-xs font-normal text-muted-foreground bg-muted/50"
                                variant="secondary"
                              >
                                {set.cardCount} cards
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {set.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent className="space-y-3" value="activity">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Your Activity
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Recent activity on your notes and flashcards
                  </p>
                </div>
              </div>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {[
                    {
                      id: '1',
                      type: 'note',
                      action: 'created',
                      title: 'React Hooks Guide',
                      time: 'Oct 30, 2025',
                      details: '',
                    },
                    {
                      id: '1',
                      type: 'note',
                      action: 'created',
                      title: 'React Hooks Guide',
                      time: 'Oct 30, 2025',
                      details: '',
                    },
                    {
                      id: '1',
                      type: 'note',
                      action: 'created',
                      title: 'React Hooks Guide',
                      time: 'Oct 30, 2025',
                      details: '',
                    },
                    {
                      id: '1',
                      type: 'note',
                      action: 'created',
                      title: 'React Hooks Guide',
                      time: 'Oct 30, 2025',
                      details: '',
                    },
                    {
                      id: '2',
                      type: 'flashcard',
                      action: 'studied',
                      title: 'JavaScript Basics',
                      time: 'Oct 29, 2025',
                      details: '8/12 cards mastered',
                    },
                    {
                      id: '3',
                      type: 'note',
                      action: 'updated',
                      title: 'TypeScript Best Practices',
                      time: 'Oct 27, 2025',
                      details: '',
                    },
                    {
                      id: '4',
                      type: 'flashcard',
                      action: 'created',
                      title: 'CSS Grid Layout',
                      time: 'Oct 23, 2025',
                      details: '',
                    },
                  ].map((activity) => (
                    <Card
                      className="hover:bg-accent/10 transition-colors border-border/50"
                      key={activity.id}
                    >
                      <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                            {activity.type === 'note' ? (
                              <FileText className="h-3.5 w-3.5" />
                            ) : (
                              <BookOpen className="h-3.5 w-3.5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="text-sm font-medium text-black dark:text-white leading-tight line-clamp-1">
                                {activity.title}
                              </h4>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {activity.time}
                              </span>
                            </div>
                            {activity.details && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {activity.details}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
