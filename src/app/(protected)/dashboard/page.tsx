import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserDashboardData } from '@/features/user/data-access/user';
import { getCurrentUser } from '@/lib/auth';
import { ActivityFeed } from '@/lib/components/dashboard/ActivityFeed';
import { DashboardStats } from '@/lib/components/dashboard/DashboardStats';
import { RecentNotesList } from '@/lib/components/dashboard/RecentNotesList';
import WelcomeSection from '@/lib/components/dashboard/WelcomeSection';
import { Button } from '@/lib/components/ui/button';
import { SIGNIN_ROUTE } from '@/lib/constants/route';

export const metadata: Metadata = {
  title: 'Dashboard | Noterra',
  description: 'View your learning progress, recent notes, and activity overview on your Noterra dashboard.',
};

export default async function DashboardPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }
  const { firstName, recentNotes, totalCreations, activityOverview } = await getUserDashboardData(userId);

  return (
    <div className="w-full mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <WelcomeSection firstName={firstName} />
        <Button asChild className="gap-2 w-full sm:w-auto">
          <Link className="flex items-center justify-center" href="/prompt">
            <Plus className="h-4 w-4" />
            New Note
          </Link>
        </Button>
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
