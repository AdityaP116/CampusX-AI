import { env } from "../config/env.config";
import { logger } from "../utils/logger";
import { ApiError } from "../utils/api-error";

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export class EmailService {
  /**
   * Send an OTP verification email to the user's university address.
   * Supports:
   * 1. Resend REST API (if RESEND_API_KEY is configured)
   * 2. Direct SMTP endpoint / Native fetch (if configured)
   * 3. Safe development logging fallback (in development only)
   */
  public static async sendOtpEmail(to: string, otp: string): Promise<boolean> {
    const subject = "CampusX Student Verification Code";
    const text = `Your CampusX single-use verification code is: ${otp}. It will expire in 5 minutes. Do not share this code with anyone.`;
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #0f172a; margin-bottom: 8px;">CampusX Student Verification</h2>
          <p style="color: #64748b; font-size: 14px;">Verify your university email to unlock student trading.</p>
        </div>
        <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #1e40af; font-family: monospace;">${otp}</span>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 8px;">Valid for 5 minutes (single-use)</p>
        </div>
        <p style="color: #64748b; font-size: 13px; line-height: 1.5;">If you did not request this verification code, please ignore this email. No action is required.</p>
        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
        <p style="color: #94a3b8; font-size: 11px; text-align: center;">CampusX Student Marketplace &bull; Built for students, by students.</p>
      </div>
    `;

    // 1. Resend API
    if (env.RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: env.SMTP_FROM || "verify@campusx.ai",
            to,
            subject,
            text,
            html,
          }),
        });

        if (!response.ok) {
          const errData = await response.text();
          logger.error(`Resend API failed: ${errData}`);
          throw new Error("Failed to dispatch email via Resend");
        }

        logger.info(`Verification email dispatched successfully to ${to} via Resend`);
        return true;
      } catch (err: unknown) {
        logger.error(`Email dispatch error: ${(err as Error).message}`);
        if (env.NODE_ENV === "production") {
          throw ApiError.internal("Email provider communication failed. Please try again later.");
        }
      }
    }

    // 2. Development & Test environment fallback
    if (env.NODE_ENV !== "production") {
      logger.info(`[DEV ONLY] Verification email to ${to}: OTP is [${otp}]`);
      return true;
    }

    // 3. In production with no provider configured: Fail safely rather than falsely claiming delivery
    logger.error("Production email delivery failed: No email provider (RESEND_API_KEY or SMTP) configured");
    throw ApiError.internal("Email delivery service not configured on server. Contact support.");
  }
}
