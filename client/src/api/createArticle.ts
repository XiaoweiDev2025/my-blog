import { request } from "./client";

export interface ArticleCreatePayload {
    title: string;
    summary: string;
    content: string;
    authorId: number;
}

export async function createArticle(payload: ArticleCreatePayload) {
    return request<{ id: number }>("/articles", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
