import { request } from "./client";
import type { Article } from "../types/Article";

export async function getArticleById(id: number) {
    return request<Article>(`/articles/${id}`);
}