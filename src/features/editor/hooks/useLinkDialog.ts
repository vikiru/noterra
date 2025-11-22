'use client';

import { useEffect, useState } from 'react';

type UseLinkDialogProps = {
  initialUrl?: string;
  onSubmit: (url: string) => void;
  onRemove: () => void;
  onOpenChange: (open: boolean) => void;
};

export function useLinkDialog({
  initialUrl = '',
  onSubmit,
  onRemove,
  onOpenChange,
}: UseLinkDialogProps) {
  const [url, setUrl] = useState(initialUrl);

  // Sync url state when initialUrl prop changes
  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
      onOpenChange(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    onOpenChange(false);
  };

  return {
    url,
    setUrl,
    handleSubmit,
    handleRemove,
  };
}
