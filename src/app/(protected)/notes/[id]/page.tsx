import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { NoteDetailWrapper } from '@/features/notes/components/NoteDetailWrapper';

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <NoteDetailWrapper noteId={id as string} />
    </Suspense>
  );
}
