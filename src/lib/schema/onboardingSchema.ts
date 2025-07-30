import z from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  bio: z.string().min(10).max(300),
  country: z.string().min(1).max(100),
});
