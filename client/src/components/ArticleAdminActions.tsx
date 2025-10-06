import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../api/deleteArticles";

type Props = {
    role?: string;
    id?: number;
    className?: string;
};

export default function ArticleAdminActions({ id, role, className }: Props) {
    const nav = useNavigate();
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    if (role !== "admin") return null;

    async function onDelete() {
        if (id == null) return;
        setErr(null);
        if (!confirm("Are you sure? It's unrecoverable.")) return;
        setBusy(true);
        try {
            await deleteArticle(id);
            nav("/articles");
        } catch (e:any) {
            setErr(e?.message ?? "Delete failed!");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className={`flex gap-2 mt-6 ${className ?? ""}`}>
            <button
                className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 disabled:opacity-60"
                onClick={() => nav("/articles/new")}
                disabled={busy}
            >
                + New
            </button>

            {typeof id === "number" && (
                <>
                    <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-60"
                        onClick={() => nav(`/articles/${id}/edit`)}
                        disabled={busy}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-60"
                        onClick={onDelete}
                        disabled={busy}
                    >
                        {busy ? "Deleting..." : "Delete"}
                    </button>
                </>
            )}

            {err && <span className="text-sm text-red-700">{err}</span>}
        </div>
    );
}
