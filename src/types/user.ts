export type User = {
    clerkId: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserCreate = Omit<User, 'createdAt' | 'updatedAt'>;
export type UserUpdate = Partial<
    Pick<User, 'bio' | 'country' | 'firstName' | 'lastName'>
> &
    Pick<User, 'clerkId' | 'email' | 'username'>;
