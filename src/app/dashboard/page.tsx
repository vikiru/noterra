import { Activity, BarChart2, BookOpen, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { findUserActivities } from '@/features/activity/data-access/activity';
import {
  findUserById,
  findUserTotalCreations,
} from '@/features/user/data-access/user';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const userId = await getCurrentUser();
  const user = await findUserById(userId as string);
  const stats = await findUserTotalCreations(userId as string);
  const activity = await findUserActivities(userId as string);

  const chartData = [
    { month: 'Oct', notes: 12, flashcards: 8 },
    { month: 'Sep', notes: 18, flashcards: 12 },
    { month: 'Aug', notes: 8, flashcards: 15 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.firstName}!
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
              {stats.notes}
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
              {stats.flashcards}
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

      {/* Activity Graph */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
            <div className="text-center p-6">
              <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Activity chart will be displayed here
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Showing data for: {chartData.map((d) => d.month).join(', ')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.slice(0, 5).map((item) => (
              <div className="flex items-start gap-3" key={item.id}>
                <div className="p-1.5 rounded-full bg-primary/10 text-primary mt-0.5"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">
                    {item.type === 'note' ? 'Note' : 'Flashcard'} {item.action}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
