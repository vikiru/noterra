'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface GetStartedButtonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function GetStartedButton({
  size = 'lg',
  className,
}: GetStartedButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={cn(
        'font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 hover:cursor-pointer',
        size === 'lg' ? 'px-8 py-6 text-base' : 'px-6 py-5 text-base',
        className,
      )}
      onClick={() => router.push('/dashboard')}
      size={size}
    >
      Get Started
      <span className="ml-2">→</span>
    </Button>
  );
}
