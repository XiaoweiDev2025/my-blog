import { Router } from "express";
import bcrypt from "bcryptjs";

const router = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

router.post("/login", async (req, res) => {
    const { username, password } = req.body ?? {};
    if (typeof username !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "Invalid payload" });
    }

    if (username !== ADMIN_USERNAME) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!ok) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user = { username };
    return res.json({ ok: true });
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("sid");
        res.json({ ok: true });
    });
});

router.get("/me", (req, res) => {
    const isAuth = Boolean(req.session?.user);
    res.json({ isAuth, user: req.session.user ?? null });
});

export default router;
