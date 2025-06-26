'use client';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod/v4';
import { addUser } from '@/actions/user';
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
import { onboardingSchema } from '@/schema/onboardingSchema';
import { UserCreate } from '@/types/user';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTE } from '@/constants/route';
import { useUserStore } from '@/store/user';

// TODO: split this into hooks, schema dir, add on submit, update placecholder, etc as needed

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
            const savedUser = await addUser(newUser);
            setUser(savedUser);
            if (!savedUser) {
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

    return (
        <Form {...form}>
            <h1 className="text-center text-3xl leading-tight font-semibold">
                Complete your profile
            </h1>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto max-w-3xl space-y-8 py-10"
            >
                {/* First Name Field */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormDescription>
                                Enter your first name.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="e.g., John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Last Name Field */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormDescription>
                                Enter your last name.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="e.g., Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Bio Field */}
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormDescription>
                                Tell us a little about yourself.
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder="e.g., I love coding and exploring new technologies."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>{' '}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Country Field */}
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormDescription>
                                Enter your country of residence.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder="e.g., Canada" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="cursor-pointer">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
