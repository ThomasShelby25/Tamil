import { NextRequest, NextResponse } from "next/server";
import { getRealTimeMetrics } from "@/lib/analytics/dashboard";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";

export const GET = async (request: NextRequest) => {
  try {
    const metrics = await getRealTimeMetrics();

    return NextResponse.json(
      createSuccessResponse({
        metrics,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Cache-Control": "public, max-age=60" } }
    );
  } catch (error) {
    console.error("Metrics GET error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch metrics"),
      { status: 500 }
    );
  }
};

export const revalidate = 60; // Revalidate every 60 seconds
