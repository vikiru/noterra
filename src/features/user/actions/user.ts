'use server';

import { selectUserSchema } from '@/features/user/schema/userSchema';
import { checkOwnership } from '@/lib/auth';
import { validateData } from '@/lib/utils/validateData';
import { insertUser, updateUser } from '@/user/data-access/user';
import type { User, UserCreate, UserUpdate } from '@/user/types/user';

export async function createUser(user: UserCreate) {
  try {
    console.log(user);
    const ownership = await checkOwnership(user.clerkId);
    if (!ownership) {
      return {
        success: false,
        error: 'You are not authorized to create this user. Please try again.',
      };
    }
    // const result = validateData<UserCreate>(user, insertUserSchema);
    // if (!result.success) {
    //   return result;
    // }
    // const validatedUser = result.data;
    const newUser = await insertUser(user); // TODO: fix user schema validation issues "id" is being added somewhere.
    if (!newUser) {
      return {
        success: false,
        error: 'Failed to create user. Please try again.',
      };
    }
    return { success: true, data: newUser };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      success: false,
      error: 'Failed to create user. Please try again.',
    };
  }
}

export async function modifyUser(user: User) {
  try {
    const ownership = await checkOwnership(user.clerkId);
    if (!ownership) {
      return {
        success: false,
        error: 'You are not authorized to update this user. Please try again.',
      };
    }
    const result = validateData<UserUpdate>(user, selectUserSchema);
    if (!result.success) {
      return result;
    }
    const validatedUser = result.data;
    const updatedUser = await updateUser(validatedUser);
    if (!updatedUser) {
      return {
        success: false,
        error: 'Failed to update user. Please try again.',
      };
    }
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      success: false,
      error: 'Failed to update user. Please try again.',
    };
  }
}
