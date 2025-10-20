import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/auth";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(username, password);
            const redirectTo = (loc.state as any)?.from ?? "/";
            nav(redirectTo, { replace: true });
            window.location.reload();
        } catch (e: any) {
            setError(e?.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-6 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-pink-500 mb-8">
                    Welcome Back！
                </h2>

                {error && <div className="text-red-500 text-center mb-3">{error}</div>}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition ${
                            loading
                                ? "bg-gray-400"
                                : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
                        }`}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

            </div>
        </div>
    );
}
