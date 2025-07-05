import ArticleCard from "./components/ArticleCard.tsx";
import Sidebar from "./components/Sidebar.tsx";

function App() {

    const data = [
        {
            title:"My first article",
            summary:"Mainly about how i started learning coding",
            link:"https://www.myfirstarticle.com",
        },
        {
            title:"My second article",
            summary:"Mainly about the classes i recommend",
            link:"https://www.mysecondarticle.com",
        },
        {
            title:"My third article",
            summary:"Mainly about the learning method i recommend",
            link:"https://www.mythirdarticle.com",
        }
    ]

    return (
    <>
        <div className={"max-w-screen-xl mx-auto px-4"}>
            <header>
                <h1 className="text-3xl font-bold text-center">Welcome to my blog！</h1>
            </header>

            <main className="flex w-full">
                <section className="flex-[7]">
                    <div className="space-y-4">
                        {data.map((article)=>(
                            <ArticleCard
                                key={article.link}
                                title={article.title}
                                summary={article.summary}
                                link={article.link}
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

export default App