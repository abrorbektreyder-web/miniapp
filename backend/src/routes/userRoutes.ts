import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { telegramAuth } from '../middleware/telegramAuth.js';

const router = Router();

// Protected routes (Telegram auth)
router.use(telegramAuth);

router.get('/me', userController.getProfile);

export default router;
