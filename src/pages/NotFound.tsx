import Footer from "../components/Footer.tsx";

function NotFound() {
    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-pink-500 mb-4">404 - Page Not Found</h1>
            <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
            <Footer />
        </div>
    );
}

export default NotFound;
