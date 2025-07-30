import { SignUp } from '@clerk/nextjs';

export default function SignupPage() {
  return (
    <div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-300">
      <SignUp />
    </div>
  );
}
