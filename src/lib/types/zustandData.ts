import type { UserActivity } from '@/features/activity/types/activity';
import type { Flashcard } from '@/features/cards/types/flashcard';
import type { Note } from '@/features/notes/types/notes';
import type { User } from '@/features/user/types/user';

export type ZustandData = User | UserActivity | Note | Flashcard;
