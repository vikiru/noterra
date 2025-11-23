import { currentUser } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { EditNoteForm } from '@/features/editor/components/EditNoteForm';
import { findNoteForEditing } from '@/features/notes/data-access/notes';
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
    isPublic: note.public,
    isShared: note.shared,
    showCards: note.showCards,
  };

  return <EditNoteForm metadata={metadata} visibility={visibility} />;
}
