import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import type * as React from 'react';

import { type Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

type PaginationLinkProps = Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'> & {
    isActive?: boolean;
  };

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="pagination"
      class={cn('mx-auto flex w-full justify-center', className)}
      data-slot="pagination"
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      class={cn('flex flex-row items-center gap-1', className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      class={cn('flex size-9 items-center justify-center', className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon class="size-4" />
      <span class="sr-only">More pages</span>
    </span>
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      class={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      data-active={isActive}
      data-slot="pagination-link"
      {...props}
    />
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      class={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      size="default"
      {...props}
    >
      <span class="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      class={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      size="default"
      {...props}
    >
      <ChevronLeftIcon />
      <span class="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
