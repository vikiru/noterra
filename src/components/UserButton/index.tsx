'use client';

import { UserButton as ClerkButton } from '@clerk/nextjs';
import { House, LucideUser, Notebook } from 'lucide-react';

export default function UserButton() {
    return (
        <ClerkButton>
            <ClerkButton.MenuItems>
                <ClerkButton.Link
                    label="Dashboard"
                    labelIcon={<House size={15} />}
                    href="/dashboard"
                />
                <ClerkButton.Link
                    label="Profile"
                    labelIcon={<LucideUser size={15} />}
                    href="/profile"
                />
                <ClerkButton.Link
                    label="Notes"
                    labelIcon={<Notebook size={15} />}
                    href="/notes"
                />
                <ClerkButton.Action label="manageAccount" />
            </ClerkButton.MenuItems>
        </ClerkButton>
    );
}
