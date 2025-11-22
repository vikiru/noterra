'use client';

import { ClerkProvider as BaseClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';

export default function ClerkProvider({ children }: { children: ReactNode }) {
  return <BaseClerkProvider afterSignOutUrl="/">{children}</BaseClerkProvider>;
}
