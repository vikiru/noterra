import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  findUserByUsername,
  findUserTotalCreations,
} from '@/features/user/data-access/user';

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const user = await findUserByUsername(username as string);
  const stats = await findUserTotalCreations(user.clerkId as string);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 text-zinc-800 dark:text-zinc-100">
          <p>
            <span className="font-semibold">Name:</span> {user.firstName}{' '}
            {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {user.country}
          </p>
          <p>
            <span className="font-semibold">Bio:</span> {user.bio || '—'}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{' '}
            {user.createdAt.toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span>{' '}
            {user.updatedAt.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Stats</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-2 text-zinc-700 dark:text-zinc-300">
          <p>
            <span className="font-semibold">Notes Created:</span> {stats.notes}
          </p>
          <p>
            <span className="font-semibold">Flashcards Generated:</span>{' '}
            {stats.flashcards}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
