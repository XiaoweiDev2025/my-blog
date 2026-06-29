import { useNavigate } from "react-router-dom";

export default function NewArticleCTA({
                                          role,
                                          className,
                                      }: { role?: string; className?: string }) {

    const nav = useNavigate();
    if (role !== "admin") return null;
    return (
        <div
            className={
                `rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm ` +
                `px-4 py-4 md:px-6 md:py-5 ${className ?? ""}`
            }
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full border dark:border-gray-500 flex items-center justify-center text-gray-700 dark:text-gray-200">
                        <span aria-hidden>＋</span>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Create a new article</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Write in Markdown (GFM supported)
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => nav("/articles/new")}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                    + New
                </button>
            </div>
        </div>
    );
}
