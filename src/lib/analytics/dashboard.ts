import { prisma } from "@/lib/db/prisma";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  totalVolume: number;
  averageTransactionAmount: number;
  transactionSuccessRate: number;
  transactionFailureRate: number;
  systemUptime: number;
  averageResponseTime: number;
  contactSubmissions: number;
  emailDeliveryRate: number;
  weeklyGrowth: {
    userGrowth: number;
    transactionGrowth: number;
    volumeGrowth: number;
  };
}

export interface RealTimeMetrics {
  globalUsers: string;
  transactions: string;
  uptime: string;
  securityScore: string;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // User stats
  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({
    where: { isActive: true },
  });

  // Transaction stats
  const allTransactions = await prisma.transaction.groupBy({
    by: ["status"],
    _count: true,
    _sum: {
      amount: true,
    },
  });

  const totalTransactions = await prisma.transaction.count();
  const totalVolume = (
    await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
    })
  )._sum.amount || 0;

  const completedTransactions = allTransactions.find((t) => t.status === "completed");
  const completedCount = completedTransactions?._count || 0;

  const averageTransactionAmount = totalTransactions > 0 ? totalVolume / totalTransactions : 0;
  const transactionSuccessRate = totalTransactions > 0 ? (completedCount / totalTransactions) * 100 : 0;
  const transactionFailureRate = 100 - transactionSuccessRate;

  // System health
  const latestHealth = await prisma.systemHealth.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const systemUptime = latestHealth?.uptime || 99.99;
  const averageResponseTime = latestHealth?.responseTime || 0;

  // Contact submissions
  const contactSubmissions = await prisma.contactSubmission.count();
  const emailDeliveryRate =
    contactSubmissions > 0
      ? ((
          await prisma.contactSubmission.count({
            where: {
              OR: [{ confirmationEmailSent: true }, { notificationEmailSent: true }],
            },
          })
        ) /
          contactSubmissions) *
        100
      : 0;

  // Weekly growth
  const thisWeekUsers = await prisma.user.count({
    where: {
      createdAt: { gte: weekAgo },
    },
  });

  const lastWeekUsers =
    (await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
          lt: weekAgo,
        },
      },
    })) || 1;

  const userGrowth = ((thisWeekUsers - lastWeekUsers) / lastWeekUsers) * 100;

  const thisWeekTransactions = await prisma.transaction.count({
    where: { createdAt: { gte: weekAgo } },
  });

  const lastWeekTransactions =
    (await prisma.transaction.count({
      where: {
        createdAt: {
          gte: new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
          lt: weekAgo,
        },
      },
    })) || 1;

  const transactionGrowth = ((thisWeekTransactions - lastWeekTransactions) / lastWeekTransactions) * 100;

  const thisWeekVolume =
    (
      await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { createdAt: { gte: weekAgo } },
      })
    )._sum.amount || 0;

  const lastWeekVolume =
    (
      await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          createdAt: {
            gte: new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
            lt: weekAgo,
          },
        },
      })
    )._sum.amount || 1;

  const volumeGrowth = ((thisWeekVolume - lastWeekVolume) / lastWeekVolume) * 100;

  return {
    totalUsers,
    activeUsers,
    totalTransactions,
    totalVolume,
    averageTransactionAmount: Math.round(averageTransactionAmount * 100) / 100,
    transactionSuccessRate: Math.round(transactionSuccessRate * 100) / 100,
    transactionFailureRate: Math.round(transactionFailureRate * 100) / 100,
    systemUptime: Math.round(systemUptime * 100) / 100,
    averageResponseTime: Math.round(averageResponseTime * 100) / 100,
    contactSubmissions,
    emailDeliveryRate: Math.round(emailDeliveryRate * 100) / 100,
    weeklyGrowth: {
      userGrowth: Math.round(userGrowth * 100) / 100,
      transactionGrowth: Math.round(transactionGrowth * 100) / 100,
      volumeGrowth: Math.round(volumeGrowth * 100) / 100,
    },
  };
}

export async function getRealTimeMetrics(): Promise<RealTimeMetrics> {
  const stats = await getDashboardStats();

  // Format metrics for display
  const formatVolume = (amount: number): string => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B+`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M+`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K+`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return {
    globalUsers: stats.totalUsers > 0 ? `${(stats.totalUsers / 1000000).toFixed(1)}M+` : "0",
    transactions: formatVolume(stats.totalVolume),
    uptime: `${stats.systemUptime.toFixed(2)}%`,
    securityScore: stats.transactionSuccessRate > 95 ? "AAA" : stats.transactionSuccessRate > 85 ? "AA" : "A",
  };
}

export async function trackEvent(
  eventType: string,
  eventName: string,
  userId?: string,
  properties?: Record<string, unknown>
) {
  try {
    await prisma.analyticsEvent.create({
      data: {
        userId,
        eventType,
        eventName,
        properties: properties ? JSON.stringify(properties) : undefined,
      },
    });
  } catch (error) {
    console.error("Failed to track event:", error);
  }
}
