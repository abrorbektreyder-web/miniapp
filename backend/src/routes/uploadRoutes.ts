import { Router } from 'express';
import { uploadMultiple } from '../middleware/upload.js';
import { adminAuth } from '../middleware/auth.js';
import * as uploadController from '../controllers/uploadController.js';

const router = Router();

// Protected routes
router.use(adminAuth);

// Upload images
router.post('/', uploadMultiple, uploadController.uploadImages);

// Delete image
router.delete('/:filename', uploadController.deleteImage);

export default router;
