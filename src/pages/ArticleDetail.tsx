import { Navigate, useParams} from 'react-router-dom';
import { articles } from "../data/articles.ts";
import Footer from "../components/Footer.tsx";

function ArticleDetail() {
    const currentUserRole = 'admin';
    const { id } = useParams();
    const article = articles.find(item => item.id === id);

    if (!article) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="max-w-screen-md mx-auto px-4 py-6">
            <header className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                <p className="text-lg leading-relaxed">{article.summary}</p>
            </header>

            <main className="mb-6">
                <p className="text-gray-600">This is the full article content.</p>
            </main>

            {currentUserRole === 'admin' && (
                <div className="flex gap-2 mt-6">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        编辑
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                        删除
                    </button>
                </div>
            )}

            <section className="mt-10">
                <h2 className="text-xl font-semibold mb-4">💬 Comments</h2>

                <form className="mb-4">
                <textarea
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Leave a comment..."
                    rows={4}
                />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>

                <div className="space-y-4">
                    <div className="border rounded p-3">
                        <p className="text-sm text-gray-800">Great article! Really helpful 🙌</p>
                        <p className="text-xs text-gray-500 mt-1">— Anonymous</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <button className="text-red-500 text-xl">❤️</button>
                    <span className="text-sm text-gray-600">23 Likes</span>
                </div>
            </section>

            <Footer />
        </div>
    );

}

export default ArticleDetail;