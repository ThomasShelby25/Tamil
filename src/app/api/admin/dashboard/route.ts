import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/analytics/dashboard";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";

export const GET = async () => {
  try {
    const stats = await getDashboardStats();

    return NextResponse.json(
      createSuccessResponse({
        stats,
        timestamp: new Date().toISOString(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard stats GET error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch dashboard stats"),
      { status: 500 }
    );
  }
};

export const revalidate = 60; // Revalidate every 60 seconds
