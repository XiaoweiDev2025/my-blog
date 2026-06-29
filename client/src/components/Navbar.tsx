import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { me, logout } from "../api/auth";

export default function Navbar() {
    const [isAuth, setAuth] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();

    useEffect(() => {
        (async () => {
            try {
                const res = await me();
                setAuth(res.isAuth);
            } catch {
                setAuth(false);
            }
        })();
    }, [loc.pathname]);

    async function handleLogout() {
        try {
            await logout();
            setAuth(false);
            nav("/", { replace: true });
        } catch {
            // optional: toast error
        }
    }

    return (
        <nav>
            <div className="bg-pink-400 dark:bg-pink-700 text-white max-w-screen-lg px-4 mx-auto py-3 border-b border-pink-300 dark:border-pink-800 flex justify-between items-center">
                <h1 className="text-base md:text-xl font-bold shrink-0">Kaya Wu's Blog</h1>

                <ul className="flex items-center space-x-2 md:space-x-4 text-sm md:text-base">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/about" className="hover:underline">About</Link></li>

                    {isAuth && (
                        <li>
                            <Link
                                to="/articles/new"
                                className="bg-white text-pink-600 px-2 py-1 md:px-3 rounded hover:bg-pink-50 font-medium"
                            >
                                + New
                            </Link>
                        </li>
                    )}

                    {isAuth && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-pink-600 border border-white text-white px-2 py-1 md:px-3 rounded hover:bg-pink-700 font-medium"
                            >
                                Logout
                            </button>
                        </li>
                    )}

                    {!isAuth && (
                        <li>
                            <Link
                                to="/login"
                                className="bg-white text-pink-600 px-2 py-1 md:px-3 rounded hover:bg-pink-50 font-medium"
                            >
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}