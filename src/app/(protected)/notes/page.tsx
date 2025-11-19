import { redirect } from 'next/navigation';
import { NotesList } from '@/features/notes/components/NotesList';
import { findNoteMetadata, findNotesByUserId } from '@/features/notes/data-access/notes';
import { getCurrentUser } from '@/lib/auth';
import { SIGNIN_ROUTE } from '@/lib/constants/route';

export default async function NotesPage() {
  const userId = await getCurrentUser();
  if (!userId) {
    redirect(SIGNIN_ROUTE);
  }
  const notes = await findNoteMetadata(userId as string);

  return <NotesList notes={notes} />;
}
