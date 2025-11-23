'use client';

import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { GetStartedButton } from '@/lib/components/landing/GetStartedButton';
import { Spinner } from '@/lib/components/ui/spinner';

const UserButton = dynamic(() => import('@/lib/components/layout/UserButton'), {
  ssr: false,
});

export function UserButtonWrapper() {
  const { isLoaded, user } = useUser();
  const [mounted, setMounted] = useState(false);

  // Wait for client to mount, to avoid hydration mismatch issues due to Clerk
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isLoaded) return <Spinner />;
  return user ? <UserButton /> : <GetStartedButton size="sm" />;
}
