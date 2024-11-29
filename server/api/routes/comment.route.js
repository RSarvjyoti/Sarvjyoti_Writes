import { Router } from "express";
import { createComment, getPostComments, likeComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/getcomment/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyToken, likeComment);

export default router;