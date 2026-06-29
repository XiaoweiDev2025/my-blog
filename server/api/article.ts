import type { Request, Response } from 'express';
import * as articleService from '../services/articleService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/articles
export const getArticles = asyncHandler(async (_req: Request, res: Response) => {
    const list = await articleService.list();
    res.status(200).json(list);
});

// GET /api/articles/drafts
export const getDrafts = asyncHandler(async (_req: Request, res: Response) => {
    const drafts = await articleService.listDrafts();
    res.status(200).json(drafts);
});

// GET /api/articles/:id
export const getArticleById = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

    const article = await articleService.getById(id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(article);
});

// POST /api/articles
export const createArticle = asyncHandler(async (req, res) => {
    const { title, summary, content, published = true } = req.body ?? {};
    const authorId = req.session.user?.id;
    if (!title || !summary || !content) {
        return res.status(400).json({ message: 'title, summary, content are required' });
    }
    if (!authorId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const created = await articleService.create({ title, summary, content, authorId, published });
    res.status(201).json(created);
});

// PUT /api/articles/:id
export const updateArticle = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

    const { title, summary, content, published } = req.body ?? {};
    if (!title && !summary && !content && published === undefined) {
        return res.status(400).json({ message: 'No fields to update' });
    }
    const updated = await articleService.update(id, { title, summary, content, published });
    if (!updated) return res.status(404).json({ message: 'Article not found' });
    res.status(200).json(updated);
});

// DELETE /api/articles/:id
export const deleteArticle = asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid id' });

    const ok = await articleService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Article not found' });
    res.status(204).send(); // No Content
});
