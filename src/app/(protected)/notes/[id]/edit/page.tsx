import { currentUser } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';
import { EditNoteForm } from '@/features/editor/components/EditNoteForm';
import { findNoteForEditing } from '@/features/notes/data-access/notes';
import Loader from '@/lib/components/layout/Loader';
import { SIGNIN_ROUTE } from '@/lib/constants/route';

type EditNotePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;
  const user = await currentUser();

  if (!user) {
    redirect(SIGNIN_ROUTE);
  }

  const note = await findNoteForEditing(id);

  if (!note) {
    notFound();
  }

  const metadata = {
    noteId: note.id,
    title: note.title,
    content: note.content,
    summary: note.summary,
    keywords: note.keywords,
  };

  const visibility = {
    initialPublic: note.public,
    initialShared: note.shared,
    initialShowCards: note.showCards,
  };

  return (
    <Suspense fallback={<Loader />}>
      <EditNoteForm metadata={metadata} visibility={visibility} />
    </Suspense>
  );
}
