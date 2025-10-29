import { cn } from '@/utils/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-neutral-100 animate-pulse rounded-md dark:bg-neutral-800',
        className,
      )}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
