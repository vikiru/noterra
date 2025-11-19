import UserButton from '@/lib/components/UserButton';
import { Logo } from '@/lib/components/Logo';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export async function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Logo />
      </a>
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
      </div>
    </header>
  );
}
