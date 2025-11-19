import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noterra | Signup',
  description: 'Signup to Noterra to start creating notes and flashcards.',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-300">
      <SignUp />
    </div>
  );
}
