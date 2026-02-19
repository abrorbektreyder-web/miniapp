import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { optimizeImage, createThumbnail } from '@utils/imageOptimizer';

/**
 * Upload product images
 * POST /api/admin/upload
 */
export const uploadImages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILES',
          message: 'No images uploaded',
        },
      });
      return;
    }

    const files = req.files as Express.Multer.File[];
    const uploadedImages = [];

    for (const file of files) {
      const originalPath = file.path;
      const fileName = path.basename(file.filename, path.extname(file.filename));
      const uploadDir = path.dirname(originalPath);

      // Optimize image
      const optimizedPath = path.join(uploadDir, `${fileName}-optimized.webp`);
      await optimizeImage(originalPath, optimizedPath, {
        width: 1200,
        height: 1200,
        quality: 85,
        format: 'webp',
      });

      // Create thumbnail
      const thumbnailPath = path.join(uploadDir, `${fileName}-thumbnail.webp`);
      await createThumbnail(originalPath, thumbnailPath, 400);

      // Delete original
      fs.unlinkSync(originalPath);

      // Store URLs
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      uploadedImages.push({
        original: `${baseUrl}/uploads/products/${fileName}-optimized.webp`,
        thumbnail: `${baseUrl}/uploads/products/${fileName}-thumbnail.webp`,
      });
    }

    res.status(201).json({
      success: true,
      data: {
        images: uploadedImages,
        count: uploadedImages.length,
      },
      message: 'Images uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'UPLOAD_ERROR',
        message: 'Failed to upload images',
      },
    });
  }
};

/**
 * Delete image
 * DELETE /api/admin/upload/:filename
 */
export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;
    const uploadDir = path.join(process.cwd(), 'uploads', 'products');

    // Delete all variants
    const variants = [
      filename,
      filename.replace('.webp', '-optimized.webp'),
      filename.replace('.webp', '-thumbnail.webp'),
    ];

    for (const variant of variants) {
      const filePath = path.join(uploadDir, variant);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'DELETE_ERROR',
        message: 'Failed to delete image',
      },
    });
  }
};
