'use client';

import { UserButton as ClerkButton } from '@clerk/nextjs';
import { House, LucideUser, Notebook } from 'lucide-react';

export default function UserButton() {
  return (
    <ClerkButton>
      <ClerkButton.MenuItems>
        <ClerkButton.Link
          href="/dashboard"
          label="Dashboard"
          labelIcon={<House size={15} />}
        />
        <ClerkButton.Link
          href="/profile"
          label="Profile"
          labelIcon={<LucideUser size={15} />}
        />
        <ClerkButton.Link
          href="/notes"
          label="Notes"
          labelIcon={<Notebook size={15} />}
        />
        <ClerkButton.Action label="manageAccount" />
      </ClerkButton.MenuItems>
    </ClerkButton>
  );
}
