import { currentUser } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

import { EditNoteForm } from '@/features/editor/components/EditNoteForm';
import {
  findNoteById,
  findNoteForEditing,
} from '@/features/notes/data-access/notes';
import { checkOwnership } from '@/lib/auth';

type EditNotePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const note = await findNoteForEditing(id);

  if (!note) {
    notFound();
  }

  const ownershipCheck = await findNoteById(id);
  if (!ownershipCheck) notFound();

  const isOwner = await checkOwnership(ownershipCheck.authorId);
  if (!isOwner) {
    redirect('/notes');
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl h-[calc(100vh-4rem)]">
      <EditNoteForm initialData={note} />
    </div>
  );
}
