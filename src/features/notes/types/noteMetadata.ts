import type { Note } from '@/features/notes/types/notes';

export type NoteMetadata = Pick<
  Note,
  | 'id'
  | 'authorId'
  | 'title'
  | 'summary'
  | 'keywords'
  | 'createdAt'
  | 'shared'
  | 'showCards'
  | 'public'
  | 'shareToken'
>;
