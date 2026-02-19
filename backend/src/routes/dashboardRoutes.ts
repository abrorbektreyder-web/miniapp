import { Router } from 'express';
import * as dashboardController from '@controllers/dashboardController';
import { adminAuth } from '@middleware/auth';

const router = Router();

// Protected routes (Admin)
router.use(adminAuth);

router.get('/', dashboardController.getDashboardStats);

export default router;
