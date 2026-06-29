import { Router } from 'express';
import { requireAuth } from "../middlewares/requireAuth.js";
import {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    getDrafts,
} from '../api/article.js';
import commentsRouter from './comments.js';

const router = Router();

router.get('/', getArticles);
router.get('/drafts', requireAuth, getDrafts);
router.get('/:id', getArticleById);
router.post('/', requireAuth, createArticle);
router.put('/:id', requireAuth, updateArticle);
router.delete('/:id', requireAuth, deleteArticle);

router.use('/:articleId/comments', commentsRouter);

export default router;