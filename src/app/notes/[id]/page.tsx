import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { NoteDetailWrapper } from '@/features/notes/components/NoteDetailWrapper';

export default function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
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
