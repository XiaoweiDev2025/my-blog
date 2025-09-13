import { Router } from 'express';
import {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../api/article.js';

const router = Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);        // Create
router.put('/:id', updateArticle);      // Update（全量/幂等）
router.delete('/:id', deleteArticle);   // Delete

export default router;