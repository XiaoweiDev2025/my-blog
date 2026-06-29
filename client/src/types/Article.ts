export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    authorId: number;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export type ArticleUpdateInput = Partial<Pick<Article, "title" | "summary" | "content">>;