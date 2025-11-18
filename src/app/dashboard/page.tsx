import { redirect } from 'next/navigation';
import { getUserDashboardData } from '@/features/user/data-access/user';
import { getCurrentUser } from '@/lib/auth';
import { ActivityFeed } from '@/lib/components/dashboard/ActivityFeed';
import { DashboardStats } from '@/lib/components/dashboard/DashboardStats';
import { RecentNotesList } from '@/lib/components/dashboard/RecentNotesList';
import { SIGNIN_ROUTE } from '@/lib/constants/route';

export default async function DashboardPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }

  const { firstName, recentNotes, totalCreations, activityOverview } =
    await getUserDashboardData(userId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-heading">
          Welcome back, {firstName || 'User'}
        </h1>
        <p className="text-muted-foreground font-body">
          Here's what's happening with your studies today.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats totalCreations={totalCreations} />

      {/* Recent Notes */}
      <RecentNotesList recentNotes={recentNotes} />

      {/* Recent Activity */}
      <ActivityFeed activityOverview={activityOverview} />
    </div>
  );
}
