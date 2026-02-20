import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { telegramAuth } from '../middleware/telegramAuth.js';
import { adminAuth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getProductBySlug);

// Protected routes (Admin)
router.use(adminAuth);

router.get('/admin/products', productController.getAllProductsAdmin);
router.post('/admin/products', productController.createProduct);
router.put('/admin/products/:id', productController.updateProduct);
router.delete('/admin/products/:id', productController.deleteProduct);

export default router;
