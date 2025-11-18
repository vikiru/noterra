import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

import './globals.css';
import {
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Syne,
} from 'next/font/google';
import { Toaster } from 'sonner';
import { TanstackProvider } from '@/lib/components/providers/TanstackProvider';

const fontHeading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const fontLogo = Syne({
  subsets: ['latin'],
  variable: '--font-logo',
});

export const metadata: Metadata = {
  title: 'AI Learning Tool',
  description: 'Master any topic with AI-generated notes and flashcards.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`debug-screens antialiased ${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} ${fontLogo.variable} font-body`}
        >
          <Toaster position="top-right" richColors />
          <header className="flex h-16 items-center justify-end gap-4 p-4"></header>
          <TanstackProvider>{children}</TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
