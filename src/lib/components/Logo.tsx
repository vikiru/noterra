import { Library } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  containerSize?: string;
}

export function Logo({
  className,
  iconSize = 20,
  textSize = 'text-lg',
  containerSize = 'h-8 w-8',
}: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-lg bg-primary flex items-center justify-center shrink-0',
          containerSize,
        )}
      >
        <Library className="text-primary-foreground" size={iconSize} />
      </div>
      <h2 className={cn('font-bold tracking-tight font-logo', textSize)}>
        Noterra
      </h2>
    </div>
  );
}
