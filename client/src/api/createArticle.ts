export async function createArticle(payload: { title: string; summary: string; content: string }) {
    const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create article");
    return res.json() as Promise<{ id: number }>;
}
