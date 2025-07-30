import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
