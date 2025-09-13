import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.tsx";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-screen-lg mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;