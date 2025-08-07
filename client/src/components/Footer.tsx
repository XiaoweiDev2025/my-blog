import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="mt-8 text-center text-sm text-gray-500">
            <Link to="/" className="text-blue-600 hover:underline">
                ← Back to Home
            </Link>
            <div className="mt-2">© 2025 My Blog. All rights reserved.</div>
        </footer>
    );
}

export default Footer;
