import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <Navbar />
            <main className="max-w-screen-lg mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
