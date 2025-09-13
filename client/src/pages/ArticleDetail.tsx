import { Navigate, useParams} from 'react-router-dom';
import CommentSection from "../components/CommentSection.tsx";
import {useEffect, useState} from "react";
import type {ArticleProps} from "../types/ArticleProps.ts";

function ArticleDetail() {
    const currentUserRole = 'admin';
    const { id } = useParams();
    const articleId = Number(id);
    const [article, setArticle] = useState<ArticleProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/articles/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Fetch failed");
                return res.json();
            })
            .then(data => {
                setArticle(data);
            })
            .catch(err => {
                console.error(err);
                setArticle(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!article) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="max-w-screen-md mx-auto px-4 py-6">
            <header className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{article?.title}</h1>
                <p className="text-lg leading-relaxed">{article?.summary}</p>
            </header>

            <main className="mb-6">
                <p className="text-gray-600">This is the full article content.</p>
            </main>

            {currentUserRole === 'admin' && (
                <div className="flex gap-2 mt-6">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        Delete
                    </button>
                </div>
            )}

            <CommentSection articleId={articleId} />
        </div>
    );

}

export default ArticleDetail;