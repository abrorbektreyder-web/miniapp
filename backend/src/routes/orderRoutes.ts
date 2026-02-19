import { Router } from 'express';
import * as orderController from '@controllers/orderController';
import { telegramAuth } from '@middleware/telegramAuth';
import { adminAuth } from '@middleware/auth';

const router = Router();

// Public routes (need Telegram auth)
router.use(telegramAuth);

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);

// Protected routes (Admin)
router.use(adminAuth);

router.get('/admin/orders', orderController.getAllOrdersAdmin);
router.get('/admin/orders/:id', orderController.getOrderByIdAdmin);
router.put('/admin/orders/:id', orderController.updateOrderStatus);
router.delete('/admin/orders/:id', orderController.deleteOrder);

export default router;
