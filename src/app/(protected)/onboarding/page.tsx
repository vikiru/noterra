import { redirect } from 'next/navigation';
import { DASHBOARD_ROUTE } from '@/constants/route';
import { findUserById } from '@/features/user/data-access/user';
import { getCurrentUser } from '@/lib/auth';
import { OnboardingForm } from '@/lib/components/onboarding/OnboardingForm';

export default async function OnboardingPage() {
  const userId = await getCurrentUser();
  const databaseUser = await findUserById(userId as string);

  if (databaseUser) {
    redirect(DASHBOARD_ROUTE);
  }

  return <OnboardingForm />;
}
