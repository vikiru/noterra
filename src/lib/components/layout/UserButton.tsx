'use client';
import { UserButton as ClerkButton, useUser } from '@clerk/nextjs';
import {
  BookOpen,
  House,
  LucideUser,
  Notebook,
  PlusCircle,
} from 'lucide-react';

export default function UserButton() {
  const { user } = useUser();

  return (
    <ClerkButton>
      <ClerkButton.MenuItems>
        <ClerkButton.Link
          href="/dashboard"
          label="Dashboard"
          labelIcon={<House className="w-4 h-4" />}
        />
        <ClerkButton.Link
          href={`/${user?.username}`}
          label="Profile"
          labelIcon={<LucideUser className="w-4 h-4" />}
        />
        <ClerkButton.Link
          href="/prompt"
          label="New Note"
          labelIcon={<PlusCircle className="w-4 h-4" />}
        />
        <ClerkButton.Link
          href="/notes"
          label="Notes"
          labelIcon={<Notebook className="w-4 h-4" />}
        />
        <ClerkButton.Link
          href="/cards"
          label="Flashcards"
          labelIcon={<BookOpen className="w-4 h-4" />}
        />
        <ClerkButton.Action label="manageAccount" />
      </ClerkButton.MenuItems>
    </ClerkButton>
  );
}
