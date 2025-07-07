export type Note = {
    id: string;
    authorId: string;
    title: string;
    summary: string;
    keywords: string;
    content: string;
    shared: boolean;
    public: boolean;
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
        'content' | 'keywords' | 'public' | 'shared' | 'summary' | 'title'
    >
> &
    Pick<Note, 'authorId' | 'id'>;
