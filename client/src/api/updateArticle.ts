import { request } from "./client";
import type { Article, ArticleUpdateInput } from "../types/Article";

export function updateArticle(id: number, data: ArticleUpdateInput) {
    return request<Article>(`/articles/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}