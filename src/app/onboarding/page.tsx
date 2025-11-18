'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DASHBOARD_ROUTE } from '@/constants/route';
import { OnboardingForm } from '@/lib/components/onboarding/OnboardingForm';
import { type UserState, useUserStore } from '@/user/store/userStore';

export default function OnboardingPage() {
  const user = useUserStore((state: UserState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(DASHBOARD_ROUTE);
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return <OnboardingForm />;
}
