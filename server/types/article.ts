export type ArticleCreateDTO = {
    title: string;
    summary: string;
    content: string;
    authorId: number;
};

export type ArticleUpdateDTO = Partial<{
    title: string;
    summary: string;
    content: string;
}>;
