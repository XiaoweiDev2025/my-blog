import ArticleCard from "../components/ArticleCard.tsx";
import Sidebar from "../components/Sidebar.tsx";
import {articles} from "../data/articles.ts";

function Home(){

    return (
        <>
            <div className={"max-w-screen-xl mx-auto px-4"}>
                <header>
                    <h1 className="text-3xl font-bold text-center">Welcome to my blog！</h1>
                    <br />
                </header>

                <main className="flex w-full">
                    <section className="flex-[7]">
                        <div className="space-y-4">
                            {articles.map((article)=>(
                                <ArticleCard
                                    key={article.id}
                                    id={article.id}
                                    title={article.title}
                                    summary={article.summary}
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
    )
}

export default Home;