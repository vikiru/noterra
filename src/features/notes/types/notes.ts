export type Note = {
  id: string;
  authorId: string;
  title: string;
  summary: string;
  keywords: string;
  content: string;
  shared: boolean;
  public: boolean;
  showCards: boolean;
  shareToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NoteCreate = Omit<
  Note,
  'createdAt' | 'id' | 'shareToken' | 'updatedAt'
>;

export type NoteUpdate = Partial<
  Pick<
    Note,
    | 'content'
    | 'keywords'
    | 'public'
    | 'shared'
    | 'showCards'
    | 'summary'
    | 'title'
  >
> &
  Pick<Note, 'authorId' | 'id'>;
