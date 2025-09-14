import type {Request, Response} from "express";
import { findCommentsByArticle, createCommentForArticle } from "../services/commentService.js";

export async function getComments(req: Request, res: Response) {
    const articleId = Number(req.params.articleId);
    if (Number.isNaN(articleId)) return res.status(400).json({ error: "Invalid article id" });

    const comments = await findCommentsByArticle(articleId);
    res.json(comments);
}

export async function createComment(req: Request, res: Response) {
    const articleId = Number(req.params.articleId);
    const { author = "Anonymous", body } = req.body ?? {};

    if (Number.isNaN(articleId)) return res.status(400).json({ error: "Invalid article id" });
    if (!body || typeof body !== "string" || body.trim().length === 0) {
        return res.status(400).json({ error: "Comment body required" });
    }

    const comment = await createCommentForArticle(articleId, String(author), body);
    res.status(201).json(comment);
}