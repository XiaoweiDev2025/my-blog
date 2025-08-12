import { Router } from "express";
import { prisma } from "../server/prismaClient.js";

const router = Router();

router.get("/:id/comments", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid article id" });

    const comments = await prisma.comment.findMany({
        where: { articleId: id },
        orderBy: { createdAt: "desc" },
    });
    res.json(comments);
});

router.post("/:id/comments", async (req, res) => {
    const id = Number(req.params.id);
    const { author = "Anonymous", body } = req.body ?? {};
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid article id" });
    if (!body || typeof body !== "string" || body.trim().length === 0) {
        return res.status(400).json({ error: "Comment body required" });
    }

    const comment = await prisma.comment.create({
        data: { articleId: id, author: String(author).slice(0, 50), body: body.trim() },
    });
    res.status(201).json(comment);
});

export default router;
