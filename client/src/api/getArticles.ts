import { request } from "./client";
import type { Article } from "../types/Article";

export async function getArticles() {
    return request<Article[]>("/articles");
}