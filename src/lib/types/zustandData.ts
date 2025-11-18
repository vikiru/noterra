import type { Flashcard } from '@/features/cards/types/flashcard';
import type { Note } from '@/features/notes/types/notes';
import type { User } from '@/features/user/types/user';

export type ZustandData = User | Note | Flashcard;
