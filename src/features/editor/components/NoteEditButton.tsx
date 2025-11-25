'use client';

import { Edit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function NoteEditButton() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/edit`}>
      <Button className="gap-1.5" size="sm" variant="ghost">
        <Edit className="h-4 w-4" />
        <span className="hidden sm:inline">Edit</span>
      </Button>
    </Link>
  );
}
