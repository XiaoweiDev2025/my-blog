export type ArticleCreateDTO = {
    title: string;
    summary: string;
    content: string;
    authorId: number;
    published: boolean;
};

export type ArticleUpdateDTO = Partial<{
    title: string;
    summary: string;
    content: string;
    published: boolean;
}>;
