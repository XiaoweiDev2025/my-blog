import { request } from "./client";

export async function login(username: string, password: string) {
    return request<{ ok: true }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
}

export async function me() {
    return request<{ isAuth: boolean; user: { username: string } | null }>("/auth/me", {
        method: "GET",
    });
}

export async function logout() {
    return request<void>("/auth/logout", { method: "POST" });
}
