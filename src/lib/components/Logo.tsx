import { Library } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function Logo({
  className,
  iconSize = 20,
  textSize = 'text-lg',
}: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <Library className="text-primary-foreground" size={iconSize} />
      </div>
      <span className={cn('font-bold tracking-tight font-logo', textSize)}>
        Noterra
      </span>
    </div>
  );
}
