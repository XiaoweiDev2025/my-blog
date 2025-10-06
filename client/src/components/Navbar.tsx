import { Link } from "react-router-dom";

export default function Navbar({ role }: { role?: string }) {
    const isAdmin = role === "admin";
    return (
        <nav>
            <div className="bg-pink-400 text-white max-w-screen-lg px-4 mx-auto py-3 border-b flex justify-between items-center">
                <h1 className="text-xl font-bold">Kaya Wu's Blog</h1>
                <ul className="flex items-center space-x-4">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/about" className="hover:underline">About</Link></li>
                    {isAdmin && (
                        <li>
                            <Link
                                to="/articles/new"
                                className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-pink-50 font-medium"
                            >
                                + New
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
