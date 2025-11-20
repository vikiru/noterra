import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { Logo } from '@/lib/components/Logo';
import { GetStartedButton } from '@/lib/components/landing/GetStartedButton';
import UserButton from '@/lib/components/UserButton';

export async function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Link
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        href="/"
      >
        <Logo containerSize="h-10 w-10" iconSize={24} textSize="text-xl" />
      </Link>
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <GetStartedButton size="sm" />
        </SignedOut>
      </div>
    </header>
  );
}
