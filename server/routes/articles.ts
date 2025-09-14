import { Router } from 'express';
import {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../api/article.js';
import commentsRouter from './comments.js';

const router = Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

router.use('/:articleId/comments', commentsRouter);

export default router;