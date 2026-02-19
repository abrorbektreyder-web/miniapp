import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get dashboard statistics
 * GET /api/admin/dashboard
 */
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get total counts
    const [totalProducts, totalOrders, totalUsers, totalComments] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.comment.count(),
    ]);

    // Get total revenue
    const revenueData = await prisma.order.aggregate({
      where: {
        status: {
          in: ['CONFIRMED', 'SHIPPED', 'DELIVERED'],
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Get orders by status
    const ordersByStatus = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    // Get recent orders (last 10)
    const recentOrders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: {
          take: 3,
          include: {
            product: {
              include: {
                images: { take: 1 },
              },
            },
          },
        },
      },
    });

    // Get top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: {
            images: { take: 1 },
            category: true,
          },
        });
        return {
          product,
          totalQuantity: item._sum.quantity,
        };
      })
    );

    // Get revenue by last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const revenueByDay = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
        status: {
          in: ['CONFIRMED', 'SHIPPED', 'DELIVERED'],
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    // Process revenue by day
    const revenueChart = revenueByDay.map((item) => ({
      date: item.createdAt.toISOString().split('T')[0],
      revenue: item._sum.totalAmount,
    }));

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalOrders,
          totalUsers,
          totalComments,
          totalRevenue: revenueData._sum.totalAmount || 0,
        },
        ordersByStatus: ordersByStatus.reduce(
          (acc, item) => {
            acc[item.status] = item._count.id;
            return acc;
          },
          {} as Record<string, number>
        ),
        recentOrders,
        topProducts: topProductsWithDetails,
        revenueChart,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
};
