export interface Article {
    id: number;
    title: string;
    summary: string;
    content: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export type ArticleUpdateInput = Partial<Pick<Article, "title" | "summary" | "content">>;