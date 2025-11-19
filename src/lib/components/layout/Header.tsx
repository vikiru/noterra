import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Logo } from '@/lib/components/Logo';
import UserButton from '@/lib/components/UserButton';

export async function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-6 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <a
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        href="/"
      >
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
