// src/components/Navbar.tsx
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-pink-400 text-white max-w-screen-lg mx-auto px-4 py-3 border-b flex justify-between">
            <h1 className="text-xl font-bold">Xiaowei Wu's Blog</h1>
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/about" className="hover:underline">About</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
