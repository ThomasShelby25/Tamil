import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/api/validation";
import { createSuccessResponse, createErrorResponse } from "@/lib/api/response";
import { checkRateLimit, getRateLimitInfo } from "@/lib/api/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { getContactConfirmationEmail, getContactNotificationEmail } from "@/lib/email/templates";

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
    const validation = validateContactForm(body);
    if ("errors" in validation && !("success" in validation && validation.success === false)) {
      // This is the success case, continue
    } else if ("errors" in validation) {
      return NextResponse.json(
        createErrorResponse("Validation failed", validation.errors),
        { status: 400 }
      );
    }

    const validatedData = body; // Already validated by the schema

    // Send confirmation email to user
    try {
      await sendEmail({
        to: validatedData.email,
        ...getContactConfirmationEmail(validatedData.name),
      });
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
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Continue anyway
    }

    return NextResponse.json(
      createSuccessResponse({
        message: "Thank you for your inquiry. We'll get back to you shortly!",
        submitted: {
          name: validatedData.name,
          email: validatedData.email,
          timestamp: new Date().toISOString(),
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
