import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

/**
 * Get product comments
 * GET /api/products/:productId/comments
 */
export const getProductComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { page = '1', limit = '20', sortBy = 'newest' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    let orderBy: any = { createdAt: 'desc' };
    switch (sortBy) {
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'rating_high':
        orderBy = { rating: 'desc' };
        break;
      case 'rating_low':
        orderBy = { rating: 'asc' };
        break;
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          productId: parseInt(productId, 10),
          isVisible: true,
        },
        orderBy,
        skip,
        take: limitNum,
        include: {
          user: true,
        },
      }),
      prisma.comment.count({
        where: {
          productId: parseInt(productId, 10),
          isVisible: true,
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        items: comments,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get product comments error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

/**
 * Create comment
 * POST /api/comments
 */
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: errors.array(),
        },
      });
      return;
    }

    const { productId, text, rating } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        },
      });
      return;
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId, 10) },
    });

    if (!product) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Product not found',
        },
      });
      return;
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        productId: parseInt(productId, 10),
        userId,
        text,
        rating: parseInt(rating, 10),
      },
      include: {
        user: true,
        product: true,
      },
    });

    // Update product rating
    const stats = await prisma.comment.aggregate({
      where: { productId: parseInt(productId, 10), isVisible: true },
      _avg: { rating: true },
      _count: { id: true },
    });

    await prisma.product.update({
      where: { id: parseInt(productId, 10) },
      data: {
        rating: stats._avg.rating || 0,
      },
    });

    res.status(201).json({
      success: true,
      data: comment,
      message: 'Comment created successfully',
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

/**
 * Update comment
 * PUT /api/comments/:id
 */
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        },
      });
      return;
    }

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!comment) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Comment not found',
        },
      });
      return;
    }

    // Check if user owns this comment
    if (comment.userId !== userId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You can only edit your own comments',
        },
      });
      return;
    }

    // Update comment
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(text && { text }),
        ...(rating && { rating: parseInt(rating, 10) }),
      },
      include: {
        user: true,
      },
    });

    // Update product rating
    const stats = await prisma.comment.aggregate({
      where: { productId: comment.productId, isVisible: true },
      _avg: { rating: true },
    });

    await prisma.product.update({
      where: { id: comment.productId },
      data: {
        rating: stats._avg.rating || 0,
      },
    });

    res.json({
      success: true,
      data: updatedComment,
      message: 'Comment updated successfully',
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

/**
 * Delete comment
 * DELETE /api/comments/:id
 */
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        },
      });
      return;
    }

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!comment) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Comment not found',
        },
      });
      return;
    }

    // Check if user owns this comment
    if (comment.userId !== userId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You can only delete your own comments',
        },
      });
      return;
    }

    const productId = comment.productId;

    // Delete comment
    await prisma.comment.delete({
      where: { id: parseInt(id, 10) },
    });

    // Update product rating
    const stats = await prisma.comment.aggregate({
      where: { productId, isVisible: true },
      _avg: { rating: true },
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: stats._avg.rating || 0,
      },
    });

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

/**
 * Get all comments (Admin)
 * GET /api/admin/comments
 */
export const getAllCommentsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, isVisible, sortBy = 'newest', page = '1', limit = '20' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (productId) {
      where.productId = parseInt(productId as string, 10);
    }

    if (isVisible !== undefined) {
      where.isVisible = isVisible === 'true';
    }

    let orderBy: any = { createdAt: 'desc' };
    switch (sortBy) {
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'rating_high':
        orderBy = { rating: 'desc' };
        break;
      case 'rating_low':
        orderBy = { rating: 'asc' };
        break;
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
        include: {
          user: true,
          product: { include: { images: { take: 1 } } },
        },
      }),
      prisma.comment.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        items: comments,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Get all comments admin error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

/**
 * Update comment visibility (Admin)
 * PUT /api/admin/comments/:id
 */
export const updateCommentAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { isVisible } = req.body;

    const comment = await prisma.comment.update({
      where: { id: parseInt(id, 10) },
      data: { isVisible },
      include: {
        user: true,
        product: true,
      },
    });

    // Update product rating
    const stats = await prisma.comment.aggregate({
      where: { productId: comment.productId, isVisible: true },
      _avg: { rating: true },
    });

    await prisma.product.update({
      where: { id: comment.productId },
      data: {
        rating: stats._avg.rating || 0,
      },
    });

    res.json({
      success: true,
      data: comment,
      message: 'Comment updated successfully',
    });
  } catch (error) {
    console.error('Update comment admin error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};

/**
 * Delete comment (Admin)
 * DELETE /api/admin/comments/:id
 */
export const deleteCommentAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!comment) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Comment not found',
        },
      });
      return;
    }

    const productId = comment.productId;

    // Delete comment
    await prisma.comment.delete({
      where: { id: parseInt(id, 10) },
    });

    // Update product rating
    const stats = await prisma.comment.aggregate({
      where: { productId, isVisible: true },
      _avg: { rating: true },
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: stats._avg.rating || 0,
      },
    });

    res.json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Delete comment admin error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};
