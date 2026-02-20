import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';
import { body } from 'express-validator';
import { adminAuth } from '../middleware/auth.js';

const router = Router();

// Validation middleware
const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
];

// Public routes
router.post('/login', loginValidation, adminController.login);

// Protected routes
router.use(adminAuth);

router.get('/me', adminController.getMe);
router.post('/logout', adminController.logout);

// Seed route (development only)
router.post('/seed', adminController.seedAdmin);

export default router;
