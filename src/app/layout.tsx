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
  title: 'Noterra | AI Learning Tool',
  description:
    'Noterra is an AI-powered learning tool to generate comprehensive notes and flashcards for any user-given topic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body
          className={`debug-screens antialiased ${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} ${fontLogo.variable} font-body`}
        >
          <Toaster position="top-right" richColors />
          <TanstackProvider>{children}</TanstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
