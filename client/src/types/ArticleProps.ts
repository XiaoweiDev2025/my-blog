export interface ArticleProps {
    id: number;
    title: string;
    summary: string;
    content?: string;
    authorId?: number;
    createdAt?: string;
    updatedAt?: string;
}