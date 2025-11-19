'use client';

import { BookOpen, Home, LayoutDashboard, Library, LogOut, PlusCircle, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      active: pathname === '/dashboard',
    },
    {
      label: 'New Note',
      icon: PlusCircle,
      href: '/prompt',
      active: pathname === '/prompt',
    },
    {
      label: 'My Notes',
      icon: FileText,
      href: '/notes',
      active: pathname.startsWith('/notes'),
    },
    {
      label: 'Flashcards',
      icon: BookOpen,
      href: '/cards',
      active: pathname.startsWith('/cards'),
    },
  ];

  const bottomRoutes = [
    {
      label: 'Profile',
      icon: User,
      href: '#', // We'll need to fetch the username or handle this dynamically
      active: false,
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      active: pathname === '/settings',
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Library className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold tracking-tight font-heading">
              AI Learning
            </h2>
          </div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  route.active && "bg-secondary"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="px-3 py-2">
          <div className="space-y-1">
             <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FileText } from 'lucide-react';
