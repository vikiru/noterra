'use client';

import Link from 'next/link';
import { Logo } from '@/lib/components/layout/Logo';
import { ThemeToggle } from '@/lib/components/layout/ThemeToggle';
import { UserButtonWrapper } from '@/lib/components/layout/UserButtonWrapper';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-6 bg-background/95">
      <Link className="flex items-center gap-2 hover:opacity-80 transition-opacity" href="/">
        <Logo containerSize="h-10 w-10" iconSize={24} textSize="text-xl" />
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButtonWrapper />
      </div>
    </header>
  );
}
