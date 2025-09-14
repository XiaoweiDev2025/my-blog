import { Router } from "express";
import { getComments, createComment } from "../api/comments.js";

const router = Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', createComment);

export default router;