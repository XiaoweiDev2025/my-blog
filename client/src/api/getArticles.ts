export async function getArticles() {
    const res = await fetch("http://localhost:3001/api/articles");
    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }
    return res.json();
}