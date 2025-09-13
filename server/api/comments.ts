import type {Request, Response} from "express";
import { findCommentsByArticle, createCommentForArticle } from "../services/commentService.js";

export async function getComments(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid article id" });

    const comments = await findCommentsByArticle(id);
    res.json(comments);
}

export async function createComment(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { author = "Anonymous", body } = req.body ?? {};

    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid article id" });
    if (!body || typeof body !== "string" || body.trim().length === 0) {
        return res.status(400).json({ error: "Comment body required" });
    }

    const comment = await createCommentForArticle(id, String(author), body);
    res.status(201).json(comment);
}