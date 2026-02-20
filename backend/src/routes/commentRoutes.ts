import { Router } from 'express';
import * as commentController from '../controllers/commentController.js';
import { telegramAuth } from '../middleware/telegramAuth.js';
import { adminAuth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/products/:productId/comments', commentController.getProductComments);

// Protected routes (Telegram auth)
router.use(telegramAuth);

router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

// Protected routes (Admin)
router.use(adminAuth);

router.get('/admin/comments', commentController.getAllCommentsAdmin);
router.put('/admin/comments/:id', commentController.updateCommentAdmin);
router.delete('/admin/comments/:id', commentController.deleteCommentAdmin);

export default router;
