import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../api/getArticleById";
import { updateArticle } from "../api/updateArticle";
import { createArticle } from "../api/createArticle";
import {
    articleContainer, articleTitle, articleLead, articleProse,
    rbtn, bbtn, actionRow,
} from "../styles/articleStyles";
import { me } from "../api/auth";

export default function ArticleEditPage() {
    const { id } = useParams<{ id?: string }>();
    const nav = useNavigate();

    const isNew = !id || id === "new";
    const articleId = isNew ? null : Number(id);

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authorId, setAuthorId] = useState(1);

    const [authChecked, setAuthChecked] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const m = await me();
                if (!m.isAuth) {
                    const target = isNew ? "/edit/new" : `/edit/${id}`;
                    nav(`/login?redirect=${encodeURIComponent(target)}`, { replace: true });
                    return;
                }
            } catch {
                const target = isNew ? "/edit/new" : `/edit/${id}`;
                nav(`/login?redirect=${encodeURIComponent(target)}`, { replace: true });
                return;
            } finally {
                setAuthChecked(true);
            }
        })();
    }, [id, isNew, nav]);

    useEffect(() => {
        if (isNew) return;
        if (articleId == null || Number.isNaN(articleId)) {
            setError(`Invalid article id: ${String(id)}`);
            return;
        }
        let mounted = true;
        (async () => {
            try {
                const a = await getArticleById(articleId);
                if (!mounted) return;
                setTitle(a.title ?? "");
                setSummary(a.summary ?? "");
                setContent(a.content ?? "");
            } catch (e: any) {
                setError(e?.message ?? "Failed to load article");
            } finally {
                setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [isNew, articleId, id]);

    async function onSave() {
        setSaving(true);
        setError(null);
        try {
            if (isNew) {
                const created = await createArticle({ title, summary, content, authorId });
                nav(`/articles/${created.id}`);
            } else {
                await updateArticle(articleId!, { title, summary, content, authorId });
                nav(`/articles/${articleId}`);
            }
        } catch (e: any) {
            setError(e?.message ?? "Failed to save article");
        } finally {
            setSaving(false);
        }
    }

    if (!authChecked) return <div className="p-6">Checking auth…</div>;
    if (loading) return <div className="p-6">Loading editor…</div>;

    return (
        <div className={articleContainer}>
            {error && <div className="rounded bg-red-50 p-3 text-red-700 mb-4">{error}</div>}

            <header className="mb-4">
                <input
                    className={`${articleTitle} w-full bg-transparent focus:outline-none border-b border-transparent focus:border-gray-300`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Article title"
                />
                <textarea
                    className={`${articleLead} w-full bg-transparent mt-2 focus:outline-none border-b border-transparent focus:border-gray-300`}
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="One-sentence summary…"
                />
            </header>

            <section className="mb-6">
                <div className={articleProse}>
          <textarea
              className="w-full bg-white focus:outline-none border border-gray-200 rounded-md p-3 min-h-[18rem]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in Markdown…"
          />
                </div>
                <p className="text-xs text-gray-500 mt-2">Supports **Markdown** (GFM).</p>
            </section>

            <div className={actionRow}>
                <button onClick={onSave} disabled={saving} className={rbtn}>
                    {saving ? "Submitting…" : (isNew ? "Create" : "Save")}
                </button>
                <button onClick={() => nav(-1)} className={bbtn}>Cancel</button>
            </div>
        </div>
    );
}
