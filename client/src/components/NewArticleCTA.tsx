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
                `rounded-xl border border-dashed border-gray-300 bg-white shadow-sm ` +
                `px-4 py-4 md:px-6 md:py-5 ${className ?? ""}`
            }
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full border flex items-center justify-center">
                        <span aria-hidden>＋</span>
                    </div>
                    <div>
                        <p className="font-medium">Create a new article</p>
                        <p className="text-sm text-gray-500">
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
