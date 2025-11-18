'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function GetStartedButton() {
  const router = useRouter();

  return (
    <Button
      className="px-8 py-6 text-base font-semibold hover:cursor-pointer"
      onClick={() => router.push('/dashboard')}
      size="lg"
    >
      Get Started
      <span className="ml-2">→</span>
    </Button>
  );
}
