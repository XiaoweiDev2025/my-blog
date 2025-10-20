import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ArticleDetail from "../pages/ArticleDetail";
import NotFound from "../pages/NotFound";
import Layout from "../Layout.tsx";
import ArticleEditPage from "../pages/ArticleEditPage.tsx";
import Login from "../pages/Login.tsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="/articles/new" element={<ArticleEditPage />} />
                <Route path="articles/:id" element={<ArticleDetail />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/articles/:id/edit" element={<ArticleEditPage />} />
                <Route path="/login" element={<Login/>} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;