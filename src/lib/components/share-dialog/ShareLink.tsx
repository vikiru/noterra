'use client';

import { Check, Copy, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCopyLink } from '@/lib/hooks/useCopyLink';

type ShareLinkProps = {
  link: string;
  isPublic: boolean;
};

export function ShareLink({ link, isPublic }: ShareLinkProps) {
  const { copied, copy } = useCopyLink(link);

  return (
    <div className="flex flex-col gap-2">
      <Label
        className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
        htmlFor="link"
      >
        Share Link
      </Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            className="pr-9 h-9 text-sm bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 focus-visible:ring-1"
            defaultValue={link}
            id="link"
            readOnly
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {isPublic ? (
              <Globe className="h-3.5 w-3.5" />
            ) : (
              <Lock className="h-3.5 w-3.5" />
            )}
          </div>
        </div>
        <Button
          className="px-3 h-9 shrink-0 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
          onClick={copy}
          size="sm"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
  );
}
