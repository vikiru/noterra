'use client';

import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

import { DASHBOARD_ROUTE } from '@/constants/route';
import { createUser } from '@/features/user/actions/user';
import { onboardingSchema } from '@/schema/onboardingSchema';
import type { UserCreate } from '@/user/types/user';

export function useOnboarding() {
  const { user, isLoaded } = useUser();
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    try {
      const newUser: UserCreate = {
        clerkId: user?.id as string,
        username: user?.username as string,
        email: user?.primaryEmailAddress?.emailAddress as string,
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio,
        country: values.country,
      };

      const result = await createUser(newUser);

      if (!result.success) {
        toast.error('Failed to create user. Please try again.');
        return;
      }

      toast.success(
        'Successfully completed onboarding. Redirecting to dashboard.',
      );
      router.push(DASHBOARD_ROUTE);
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return { form, onSubmit, isLoaded };
}
