import { NextRequest, NextResponse } from "next/server";
import { validateAdminRequest } from "@/lib/auth/admin-auth";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";

export const GET = async (request: NextRequest) => {
  const authError = validateAdminRequest(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 1000);
    const offset = parseInt(searchParams.get("offset") || "0");
    const status = searchParams.get("status"); // read, unread, all

    let where = {};
    if (status === "read") {
      where = { OR: [{ confirmationEmailSent: true }, { notificationEmailSent: true }] };
    } else if (status === "unread") {
      where = { AND: [{ confirmationEmailSent: false }, { notificationEmailSent: false }] };
    }

    const [submissions, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return NextResponse.json(
      createSuccessResponse({
        submissions,
        pagination: { total, limit, offset, hasMore: offset + limit < total },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin submissions GET error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch submissions"),
      { status: 500 }
    );
  }
};
