import { Request, Response, NextFunction } from 'express';
import { validateInitData, isInitDataExpired } from '../utils/validateTelegramData.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface TelegramUser {
  id: number;
  telegramId: number;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  photoUrl: string | null;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: TelegramUser;
  }
}

/**
 * Telegram initData middleware
 * Validates Telegram WebApp initData and authenticates user
 */
export const telegramAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      res.status(500).json({
        success: false,
        error: {
          code: 'CONFIGURATION_ERROR',
          message: 'Telegram bot token is not configured',
        },
      });
      return;
    }

    // Get initData from headers
    const initData = req.headers['x-telegram-init-data'] as string;

    if (!initData) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Telegram initData is required',
        },
      });
      return;
    }

    // Validate initData
    const isValid = validateInitData(initData, botToken);

    if (!isValid) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_INIT_DATA',
          message: 'Invalid Telegram initData',
        },
      });
      return;
    }

    // Check if initData is expired (24 hours)
    if (isInitDataExpired(initData)) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INIT_DATA_EXPIRED',
          message: 'Telegram initData has expired',
        },
      });
      return;
    }

    // Parse initData
    const data = new URLSearchParams(initData);
    const userString = data.get('user');

    if (!userString) {
      res.status(401).json({
        success: false,
        error: {
          code: 'NO_USER_DATA',
          message: 'User data not found in initData',
        },
      });
      return;
    }

    const userData = JSON.parse(userString);
    const telegramId = BigInt(userData.id);

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          telegramId,
          username: userData.username || null,
          firstName: userData.first_name || null,
          lastName: userData.last_name || null,
          photoUrl: userData.photo_url || null,
        },
      });
    } else {
      // Update user data if changed
      await prisma.user.update({
        where: { id: user.id },
        data: {
          username: userData.username || user.username,
          firstName: userData.first_name || user.firstName,
          lastName: userData.last_name || user.lastName,
          photoUrl: userData.photo_url || user.photoUrl,
        },
      });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      telegramId: Number(user.telegramId),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
    };

    next();
  } catch (error) {
    console.error('Telegram auth error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error during authentication',
      },
    });
  }
};
