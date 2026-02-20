import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { adminAuth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', categoryController.getAllCategories);

// Protected routes (Admin)
router.use(adminAuth);

router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
