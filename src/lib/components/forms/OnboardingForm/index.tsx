'use client';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DASHBOARD_ROUTE } from '@/constants/route';
import { createUser } from '@/features/user/actions/user';
import { onboardingSchema } from '@/schema/onboardingSchema';
import { useUserStore } from '@/user/store/userStore';
import type { User, UserCreate } from '@/user/types/user';

export default function OnboardingForm() {
  const { user, isLoaded } = useUser();
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
  });
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

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

      setUser(result.data as User);

      toast.success(
        'Successfully completed onboarding. Redirecting to dashboard.',
      );
      router.push(DASHBOARD_ROUTE);
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <main className="min-h-screen">
      <Form {...form}>
        <div className="mx-auto max-w-2xl space-y-2 text-center">
          <h1 className="text-3xl font-semibold leading-tight">
            Complete your profile
          </h1>
          <p className="text-muted-foreground">
            Help us personalize your learning experience
          </p>
        </div>

        <form
          className="mx-auto mt-8 max-w-2xl space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    First Name
                  </FormLabel>
                  <FormDescription className="text-xs">
                    Your first name
                  </FormDescription>
                </div>
                <FormControl>
                  <Input className="h-11" placeholder="e.g., John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    Last Name
                  </FormLabel>
                  <FormDescription className="text-xs">
                    Your last name
                  </FormDescription>
                </div>
                <FormControl>
                  <Input className="h-11" placeholder="e.g., Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    About You
                  </FormLabel>
                  <FormDescription className="text-xs">
                    A short bio to help personalize your experience
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea
                    className="min-h-[100px] resize-none"
                    placeholder="Tell us a bit about yourself and your learning goals..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="space-y-1">
                  <FormLabel className="text-sm font-medium">Country</FormLabel>
                  <FormDescription className="text-xs">
                    Your country of residence
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder="e.g., Canada"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-1 pb-2">
            <Button className="hover:cursor-pointer" type="submit">
              Complete Setup
              <span className="ml-2">→</span>
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
