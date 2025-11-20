import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { ProfileHeader } from '@/features/user/components/ProfileHeader';
import { ProfileTabs } from '@/features/user/components/ProfileTabs';
import {
  findUserByUsername,
  getUserProfilePageData,
} from '@/features/user/data-access/user';
import type { User } from '@/user/types/user';

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const user: User | null = await findUserByUsername(username);

  if (!user) {
    return notFound();
  }

  const {
    userProfile,
    totalCreations,
    publicNotes,
    publicCards,
    activityOverview,
  } = await getUserProfilePageData(user.clerkId);

  if (!userProfile) {
    return notFound();
  }

  const { userId } = await auth();
  const isOwnProfile = userId === user.clerkId;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileHeader
          totalCreations={totalCreations}
          userProfile={userProfile}
        />
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
