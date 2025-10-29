import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { findUserActivities } from '@/features/activity/data-access/activity';
import { findUserTotalCreations } from '@/features/user/data-access/user';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const userId = await getCurrentUser();
  const stats = await findUserTotalCreations(userId as string);
  const activity = await findUserActivities(userId as string);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl ">Your Dashboard</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-muted-foreground text-sm">Notes Created</p>
            <p className="text-2xl font-semibold">{stats.notes}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">
              Flashcards Generated
            </p>
            <p className="text-2xl font-semibold">{stats.flashcards}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Activity Logs</p>
            <p className="text-2xl font-semibold">{activity.length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
