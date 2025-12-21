import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { findUserByUsername, getUserProfilePageData } from '@/features/user/data-access/user';
import { ProfileHeader } from '@/lib/components/profile/ProfileHeader';
import { ProfileTabs } from '@/lib/components/profile/ProfileTabs';
import type { User } from '@/user/types/user';

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const user: User | null = await findUserByUsername(username);

  if (!user) {
    return notFound();
  }

  const { userProfile, totalCreations, publicNotes, publicCards, activityOverview } = await getUserProfilePageData(
    user.clerkId,
  );

  if (!userProfile) {
    return notFound();
  }

  const { userId } = await auth();
  const isOwnProfile = userId === user.clerkId;

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileHeader totalCreations={totalCreations} userProfile={userProfile} />
        <ProfileTabs
          activity={activityOverview}
          flashcards={publicCards}
          isOwnProfile={isOwnProfile}
          notes={publicNotes}
          username={username}
        />
      </div>
    </div>
  );
}
