import { NextRequest, NextResponse } from "next/server";
import { validateAdminRequest } from "@/lib/auth/admin-auth";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const authError = validateAdminRequest(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json(
        createErrorResponse("Submission not found"),
        { status: 404 }
      );
    }

    return NextResponse.json(
      createSuccessResponse({ submission }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin submission GET error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to fetch submission"),
      { status: 500 }
    );
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const authError = validateAdminRequest(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        createErrorResponse("Invalid JSON in request body"),
        { status: 400 }
      );
    }

    const { confirmationEmailSent, notificationEmailSent } = body;
    const updateData: Record<string, unknown> = {};

    if (typeof confirmationEmailSent === "boolean") {
      updateData.confirmationEmailSent = confirmationEmailSent;
    }
    if (typeof notificationEmailSent === "boolean") {
      updateData.notificationEmailSent = notificationEmailSent;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        createErrorResponse("No valid fields to update"),
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      createSuccessResponse({ submission }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin submission PATCH error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to update submission"),
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const authError = validateAdminRequest(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json(
      createSuccessResponse({ message: "Submission deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin submission DELETE error:", error);
    return NextResponse.json(
      createErrorResponse("Failed to delete submission"),
      { status: 500 }
    );
  }
};
