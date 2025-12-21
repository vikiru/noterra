import { CalendarDays, MapPin } from 'lucide-react';
import { DateTime } from 'luxon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TotalCreations } from '@/user/types/totalCreations';

type ProfileHeaderProps = {
  userProfile: {
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    bio: string | null;
    country: string | null;
    createdAt: Date;
  };
  totalCreations: TotalCreations;
};

export function ProfileHeader({ userProfile, totalCreations }: ProfileHeaderProps) {
  const initials = `${userProfile.firstName?.[0] || ''}${userProfile.lastName?.[0] || ''}`.toUpperCase() || 'U';
  const memberSince = DateTime.fromJSDate(userProfile.createdAt).toLocaleString({
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="w-full lg:w-80 shrink-0">
      <Card className="sticky top-8">
        <div className="p-6 text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-black dark:border-white">
            <AvatarFallback className="text-2xl bg-primary/10">{initials}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">
            {userProfile.firstName} {userProfile.lastName}
          </h2>
          <p className="text-muted-foreground">@{userProfile.username}</p>

          {userProfile.bio && <p className="mt-4 text-sm text-muted-foreground">{userProfile.bio}</p>}

          <div className="mt-6 space-y-3 text-left">
            {userProfile.country && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userProfile.country}</span>
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
              <p className="text-2xl font-bold">{totalCreations.notes}</p>
              <p className="text-sm text-muted-foreground">Notes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalCreations.flashcards}</p>
              <p className="text-sm text-muted-foreground">Flashcards</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
