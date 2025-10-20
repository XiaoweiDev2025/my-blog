import { Navigate, useParams} from 'react-router-dom';
import CommentSection from "../components/CommentSection.tsx";
import {useEffect, useState} from "react";
import type {ArticleProps} from "../types/ArticleProps.ts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ArticleAdminActions from "../components/ArticleAdminActions.tsx";
import { articleContainer, articleTitle, articleLead, articleProse } from "../styles/articleStyles";

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
        <div className={articleContainer}>
            <header className="mb-4">
                <h1 className={articleTitle}>{article.title}</h1>
                <p className={articleLead}>{article.summary}</p>
            </header>

            <main className="mb-8">
                <div className={articleProse}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: (props) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
                            h2: (props) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
                            h3: (props) => <h4 className="text-lg font-medium mt-4 mb-2" {...props} />,
                            p: (props) => <p className="mb-4 leading-7" {...props} />,
                            ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
                            ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
                            a: (props) => (
                                <a className="text-pink-600 hover:underline" target="_blank" {...props} />
                            ),
                        }}
                    >
                        {article.content ?? ""}
                    </ReactMarkdown>

                </div>
            </main>

            <ArticleAdminActions id={article.id} role={currentUserRole} />
            <CommentSection articleId={articleId} />
        </div>
    );
}

export default ArticleDetail;