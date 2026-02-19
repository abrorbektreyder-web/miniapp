import { Router } from 'express';
import { uploadMultiple } from '@middleware/upload';
import { adminAuth } from '@middleware/auth';
import * as uploadController from '@controllers/uploadController';

const router = Router();

// Protected routes
router.use(adminAuth);

// Upload images
router.post('/', uploadMultiple, uploadController.uploadImages);

// Delete image
router.delete('/:filename', uploadController.deleteImage);

export default router;
