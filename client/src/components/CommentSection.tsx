const CommentSection = () => {
    return (
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
    );
};

export default CommentSection;