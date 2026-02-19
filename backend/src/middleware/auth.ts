import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AdminUser {
  id: number;
  username: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    admin?: AdminUser;
  }
}

/**
 * JWT Authentication middleware for Admin panel
 */
export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authorization token is required',
        },
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        error: {
          code: 'CONFIGURATION_ERROR',
          message: 'JWT secret is not configured',
        },
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as { adminId: number; username: string };

    // Find admin in database
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    });

    if (!admin || !admin.isActive) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Admin not found or inactive',
        },
      });
      return;
    }

    // Attach admin to request
    req.admin = {
      id: admin.id,
      username: admin.username,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid token',
        },
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Token has expired',
        },
      });
      return;
    }

    console.error('Admin auth error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error during authentication',
      },
    });
  }
};

/**
 * Optional admin auth - doesn't fail if no token
 */
export const optionalAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return next();
    }

    const decoded = jwt.verify(token, jwtSecret) as { adminId: number; username: string };

    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    });

    if (admin && admin.isActive) {
      req.admin = {
        id: admin.id,
        username: admin.username,
      };
    }
  } catch (error) {
    // Ignore errors for optional auth
  }

  next();
};
