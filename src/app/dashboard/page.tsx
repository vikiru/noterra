import {
  Activity,
  ArrowRight,
  BookOpen,
  FileText,
  Globe,
  History,
  Link,
  Lock,
  Plus,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserDashboardData } from '@/features/user/data-access/user';
import { getCurrentUser } from '@/lib/auth';
import { Button } from '@/lib/components/ui/button';
import { SIGNIN_ROUTE } from '@/lib/constants/route';

export default async function DashboardPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const { firstName, recentNotes, totalCreations, activityOverview } =
    await getUserDashboardData(userId);

  console.log(recentNotes);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {firstName || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your studies today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-medium tracking-tight">
              Total Notes
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {totalCreations.notes}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Notes created</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-medium tracking-tight">
              Flashcards
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              {totalCreations.flashcards}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Flashcards created
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
            <CardTitle className="text-sm font-medium tracking-tight">
              Active Streak
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">
              7<span className="text-xl"> days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Current streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {recentNotes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No notes found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentNotes.map((note) => (
                <a
                  className="block no-underline hover:no-underline focus:no-underline"
                  href={`/notes/${note.id}`}
                  key={note.id}
                >
                  <Card className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">
                        {note.title || 'Untitled Note'}
                      </h3>
                      <span className="ml-4 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(note.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <CardTitle>Recent Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {activityOverview.slice(0, 5).map((item) => (
              <div className="flex items-start gap-3" key={item.date}>
                <div className="p-1.5 rounded-full bg-primary/10 text-primary mt-0.5"></div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm font-medium leading-none mt-1">
                    Created {item.notes} notes and {item.flashcards} flashcards.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
