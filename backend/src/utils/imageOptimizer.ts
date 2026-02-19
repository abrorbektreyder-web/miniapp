import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

/**
 * Optimize image using Sharp
 */
export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ImageOptions = {}
): Promise<{ path: string; size: number }> {
  const {
    width = 800,
    height = 800,
    quality = 80,
    format = 'webp',
  } = options;

  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();

    // Calculate aspect ratio
    const aspectRatio = (metadata.width || 0) / (metadata.height || 1);
    let finalWidth = width;
    let finalHeight = Math.round(width / aspectRatio);

    if (finalHeight > height) {
      finalHeight = height;
      finalWidth = Math.round(height * aspectRatio);
    }

    // Resize and convert
    await sharp(inputPath)
      .resize(finalWidth, finalHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat(format, { quality })
      .toFile(outputPath);

    // Get file size
    const stats = fs.statSync(outputPath);

    return {
      path: outputPath,
      size: stats.size,
    };
  } catch (error) {
    console.error('Error optimizing image:', error);
    throw error;
  }
}

/**
 * Create thumbnail
 */
export async function createThumbnail(
  inputPath: string,
  outputPath: string,
  size: number = 200
): Promise<{ path: string; size: number }> {
  try {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'cover',
        position: 'center',
      })
      .toFormat('webp', { quality: 70 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);

    return {
      path: outputPath,
      size: stats.size,
    };
  } catch (error) {
    console.error('Error creating thumbnail:', error);
    throw error;
  }
}

/**
 * Delete file
 */
export function deleteFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

/**
 * Get file extension from mimetype
 */
export function getExtensionFromMime(mimetype: string): string {
  const mimeToExt: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
  };
  return mimeToExt[mimetype] || '.jpg';
}
