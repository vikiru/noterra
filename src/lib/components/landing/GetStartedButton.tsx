'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DASHBOARD_ROUTE } from '@/lib/constants/route';
import { cn } from '@/lib/utils/cn';

type GetStartedButtonProps = {
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
};

export function GetStartedButton({
  size = 'lg',
  className,
}: GetStartedButtonProps) {
  return (
    <Link className="inline-block group" href={DASHBOARD_ROUTE}>
      <Button
        className={cn(
          'font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:cursor-pointer',
          size === 'lg' ? 'px-8 py-6 text-base' : 'px-6 py-5 text-base',
          className,
        )}
        size={size}
      >
        Get Started{' '}
        <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
          →
        </span>
      </Button>
    </Link>
  );
}
