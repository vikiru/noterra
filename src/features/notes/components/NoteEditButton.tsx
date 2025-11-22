'use client';

import { Edit } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function NoteEditButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
      onClick={() => router.push(`${pathname}/edit`)}
      size="sm"
      variant="ghost"
    >
      <Edit className="h-4 w-4" />
      <span className="hidden sm:inline">Edit</span>
    </Button>
  );
}
