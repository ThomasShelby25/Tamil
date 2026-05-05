import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email sending will be disabled.");
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@velsaim.io";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions) => {
  if (!resend) {
    console.log("Email service disabled. Would send to:", options.to);
    return {
      success: true,
      message: "Email service is disabled (development mode)",
      id: `mock-${Date.now()}`,
    };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      message: "Email sent successfully",
      id: result.data?.id,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};
