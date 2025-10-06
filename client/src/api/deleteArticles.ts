import { request } from "./client";

export function deleteArticle(id: number) {
    return request<void>(`/articles/${id}`, { method: "DELETE" });
}
