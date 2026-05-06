import { NextRequest, NextResponse } from "next/server";
import { validateAdminRequest } from "@/lib/auth/admin-auth";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";

export const GET = async (request: NextRequest) => {
  const authError = validateAdminRequest(request);
  if (authError) return authError;

  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const [total, todayCount, weekCount, monthCount, emailSentCount] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: { createdAt: { gte: today } },
      }),
      prisma.contactSubmission.count({
        where: { createdAt: { gte: weekAgo } },
      }),
      prisma.contactSubmission.count({
        where: { createdAt: { gte: monthAgo } },
      }),
      prisma.contactSubmission.count({
        where: {
          OR: [{ confirmationEmailSent: true }, { notificationEmailSent: true }],
        },
      }),
    ]);

    const emailSuccessRate =
      total > 0 ? ((emailSentCount / total) * 100).toFixed(1) : "0";

    return NextResponse.json(
      createSuccessResponse({
        stats: {
          total,
          today: todayCount,
          thisWeek: weekCount,
          thisMonth: monthCount,
          emailSentCount,
          emailSuccessRate: parseFloat(emailSuccessRate as string),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin stats GET error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch stats"),
      { status: 500 }
    );
  }
};
