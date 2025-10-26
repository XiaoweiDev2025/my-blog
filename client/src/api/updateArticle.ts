import { request } from "./client";
import type { Article } from "../types/Article";

export interface ArticleUpdatePayload {
    title?: string;
    summary?: string;
    content?: string;
    authorId?: number;
}

export function updateArticle(id: number, data: ArticleUpdatePayload) {
    return request<Article>(`/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}