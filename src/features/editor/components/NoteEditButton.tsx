'use client';

import { Edit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function NoteEditButton() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/edit`}>
      <Button
        className="gap-1.5 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
        size="sm"
        variant="ghost"
      >
        <Edit className="h-4 w-4" />
        <span className="hidden sm:inline">Edit</span>
      </Button>
    </Link>
  );
}
