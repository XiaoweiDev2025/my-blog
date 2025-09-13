import { useEffect, useState } from "react";

type Comment = {
    id: number;
    author: string;
    body: string;
    createdAt: string;
};

const CommentSection = ({ articleId }: { articleId: number }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        (async () => {
            try {
                const res = await fetch(`/api/articles/${articleId}/comments`, { signal });
                if (!res.ok) throw new Error("Failed to load comments");
                const data = await res.json();
                setComments(data);
            } catch (err:unknown) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }
                console.error(err);
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        })();
        return () => controller.abort();
    }, [articleId]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        setSubmitting(true);

        const optimistic: Comment = {
            id: Math.random(),
            author: author.trim() || "Anonymous",
            body: body.trim(),
            createdAt: new Date().toISOString(),
        };
        setComments(prev => [optimistic, ...prev]);
        setBody("");

        try {
            const res = await fetch(`/api/articles/${articleId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author, body }),
            });
            if (!res.ok) throw new Error("Submit failed");
            const saved = await res.json();

            setComments(prev => [saved, ...prev.filter(c => c.id !== optimistic.id)]);
        } catch (e) {
            console.error(e);
            setComments(prev => prev.filter(c => c.id !== optimistic.id));
            alert("The submission failed, please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

            <form className="mb-4" onSubmit={onSubmit}>
                <input
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Your name (optional)"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <textarea
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Leave a comment..."
                    rows={4}
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={submitting || !body.trim()}
                    className="bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            {loading ? (
                <p className="text-sm text-gray-500">Loading comments…</p>
            ) : comments.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
            ) : (
                <div className="space-y-4">
                    {comments.map(c => (
                        <div key={c.id} className="border rounded p-3">
                            <p className="text-sm text-gray-800 whitespace-pre-wrap">{c.body}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                — {c.author} · {new Date(c.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default CommentSection;
