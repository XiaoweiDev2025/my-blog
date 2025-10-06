export const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        credentials: "include",
        ...init,
    });

    if (!res.ok) {
        let message = `HTTP ${res.status}`;
        try {
            const data = await res.json();
            if (typeof data?.message === "string") message = data.message;
        } catch {}
        const err = new Error(message) as Error & { status?: number };
        err.status = res.status;
        throw err;
    }

    if (res.status === 204) return undefined as unknown as T;
    return res.json() as Promise<T>;
}