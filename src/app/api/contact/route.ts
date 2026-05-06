import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/api/validation";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";
import { checkRateLimit, getRateLimitInfo } from "@/lib/api/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { getContactConfirmationEmail, getContactNotificationEmail } from "@/lib/email/templates";
import { prisma } from "@/lib/db/prisma";

export const POST = async (request: NextRequest) => {
  try {
    // Get client IP for rate limiting
    const clientIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      const rateLimitInfo = getRateLimitInfo(clientIp);
      return NextResponse.json(
        createErrorResponse(
          `Too many requests. Please try again later. Remaining: ${rateLimitInfo.remaining}`
        ),
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        createErrorResponse("Invalid JSON in request body"),
        { status: 400 }
      );
    }

    // Validate input
    let validatedData;
    try {
      validatedData = validateContactForm(body);
    } catch (error) {
      if (error instanceof Error) {
        const zodError = error as unknown as {
          errors?: Array<{ path?: string[]; message: string }>;
        };
        const errors = zodError.errors?.map?.((e) => ({
          field: e.path?.join?.(".") || "unknown",
          message: e.message
        })) || [{ field: "unknown", message: error.message }];
        return NextResponse.json(
          createErrorResponse("Validation failed", errors),
          { status: 400 }
        );
      }
      return NextResponse.json(
        createErrorResponse("Validation failed"),
        { status: 400 }
      );
    }
    const normalizedIp = clientIp.split(",")[0]?.trim() || "unknown";

    const savedSubmission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        sourceIp: normalizedIp,
      },
    });

    let confirmationEmailSent = false;
    let notificationEmailSent = false;

    // Send confirmation email to user
    try {
      await sendEmail({
        to: validatedData.email,
        ...getContactConfirmationEmail(validatedData.name),
      });
      confirmationEmailSent = true;
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue anyway - still save the submission
    }

    // Send notification email to business
    try {
      const notificationEmail = process.env.ADMIN_EMAIL || "admin@velsaim.io";
      await sendEmail({
        to: notificationEmail,
        ...getContactNotificationEmail(
          validatedData.name,
          validatedData.email,
          validatedData.message
        ),
      });
      notificationEmailSent = true;
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Continue anyway
    }

    if (confirmationEmailSent || notificationEmailSent) {
      await prisma.contactSubmission.update({
        where: { id: savedSubmission.id },
        data: {
          confirmationEmailSent,
          notificationEmailSent,
        },
      });
    }

    return NextResponse.json(
      createSuccessResponse({
        message: "Thank you for your inquiry. We'll get back to you shortly!",
        submitted: {
          id: savedSubmission.id,
          name: validatedData.name,
          email: validatedData.email,
          timestamp: savedSubmission.createdAt.toISOString(),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      createErrorResponse(
        error instanceof Error ? error.message : "An error occurred while processing your request"
      ),
      { status: 500 }
    );
  }
};

// Handle other methods
export const GET = async () => {
  return NextResponse.json(
    createErrorResponse("Method not allowed"),
    { status: 405 }
  );
};
