import type { Metadata } from 'next';

import './globals.css';
import {
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Syne,
} from 'next/font/google';
import { Toaster } from 'sonner';
import ClerkProvider from '@/lib/components/providers/ClerkProvider';
import ThemeProvider from '@/lib/components/providers/ThemeProvider';

const fontHeading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

const fontLogo = Syne({
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Noterra | AI Learning Tool',
  description:
    'Noterra is an AI-powered learning tool that can generate comprehensive notes and flashcards for any user-given topic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="/favicon-light.ico"
          media="(prefers-color-scheme: light)"
          rel="icon"
        />
        <link
          href="/favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
          rel="icon"
        />
        <link
          href="/apple-touch-icon-light.png"
          media="(prefers-color-scheme: light)"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/apple-touch-icon-dark.png"
          media="(prefers-color-scheme: dark)"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32-light.png"
          media="(prefers-color-scheme: light)"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-32x32-dark.png"
          media="(prefers-color-scheme: dark)"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16-light.png"
          media="(prefers-color-scheme: light)"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/favicon-16x16-dark.png"
          media="(prefers-color-scheme: dark)"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
      </head>
      <body
        className={`antialiased ${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} ${fontLogo.variable} font-body bg-background`}
      >
        <Toaster position="top-right" richColors />
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
