'use client';

import { useUser } from '@clerk/nextjs';
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
import { useOnboarding } from '@/features/user/hooks/useOnboarding';

export function OnboardingForm() {
  const { form, onSubmit, isLoaded } = useOnboarding();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Form {...form}>
        <div className="w-full max-w-lg space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight font-heading">
              Complete your profile
            </h1>
            <p className="text-muted-foreground font-body">
              Help us personalize your learning experience
            </p>
          </div>

          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium font-heading">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="e.g., John"
                        {...field}
                      />
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
                    <FormLabel className="text-sm font-medium font-heading">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="e.g., Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium font-heading">
                    About You
                  </FormLabel>
                  <FormDescription className="text-xs font-body">
                    A short bio to help personalize your experience
                  </FormDescription>
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
                  <FormLabel className="text-sm font-medium font-heading">
                    Country
                  </FormLabel>
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

            <Button
              className="w-full h-11 text-base font-semibold hover:cursor-pointer"
              type="submit"
            >
              Complete Setup
            </Button>
          </form>
        </div>
      </Form>
    </main>
  );
}
