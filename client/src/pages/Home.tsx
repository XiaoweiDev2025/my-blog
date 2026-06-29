import ArticleCard from "../components/ArticleCard.tsx";
import Sidebar from "../components/Sidebar.tsx";
import { getArticles, getDrafts } from "../api/getArticles";
import { me } from "../api/auth";
import {useEffect, useState} from "react";
import type { ArticleProps } from "../types/ArticleProps";
import NewArticleCTA from "../components/NewArticleCTA";

function Home() {
    const currentUserRole = "admin";
    const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [drafts, setDrafts] = useState<ArticleProps[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getArticles()
            .then(data => setArticles(data))
            .catch(err => console.error("Error fetching articles:", err));

        me().then(data => {
            if (data.isAuth) {
                setIsAdmin(true);
                getDrafts()
                    .then(data => setDrafts(data))
                    .catch(() => {});
            }
        }).catch(() => {});
    }, []);

    return (
        <>
            <div className={"max-w-screen-xl mx-auto px-4"}>
                <header>
                    <h1 className="text-3xl font-bold text-center">Welcome to my blog！</h1>
                    <br />
                </header>

                <NewArticleCTA role={currentUserRole} className="mb-6" />

                <main className="flex w-full">
                    <section className="flex-[7]">
                        {isAdmin && drafts.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-400 mb-3">Drafts</h2>
                                <div className="space-y-4">
                                    {drafts.map((article) => (
                                        <ArticleCard
                                            key={article?.id}
                                            id={article?.id}
                                            title={article?.title}
                                            summary={article?.summary}
                                        />
                                    ))}
                                </div>
                                <hr className="my-6 border-gray-200" />
                            </div>
                        )}
                        <div className="space-y-4">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article?.id}
                                    id={article?.id}
                                    title={article?.title}
                                    summary={article?.summary}
                                />
                            ))}
                        </div>
                    </section>
                    <aside className="flex-[3]">
                        <Sidebar />
                    </aside>
                </main>
            </div>
        </>
    );
}

export default Home;