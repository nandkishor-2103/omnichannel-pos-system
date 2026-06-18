import brevo from "../config/brevo.js";
import mailGenerator from "../config/mailgen.js";
import verificationEmailTemplate from "../templates/emails/verification-email.template.js";
import resetPasswordTemplate from "../templates/emails/reset-password.template.js";
import ENV_VARS from "../config/env.js";
import ApiError from "../utils/ApiError.js";

interface SendEmailProps {
  to: string;
  subject: string;
  template?: any;
  html?: string;
}

export const sendEmail = async ({
  to,
  subject,
  template,
  html,
}: SendEmailProps): Promise<void> => {
  try {
    if (!to) {
      throw new ApiError({
        statusCode: 400,
        message: "Recipient email is required",
      });
    }

    let htmlContent = html;
    let textContent = subject;

    if (template) {
      htmlContent = mailGenerator.generate(template);
      textContent = mailGenerator.generatePlaintext(template);
    }

    if (!htmlContent) {
      throw new ApiError({
        statusCode: 400,
        message: "Either template or html is required",
      });
    }

    await brevo.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent,
      textContent,

      sender: {
        name: ENV_VARS.EMAIL_FROM_NAME,
        email: ENV_VARS.EMAIL_FROM,
      },

      to: [
        {
          email: to,
        },
      ],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send email";

    throw new ApiError({
      statusCode: 500,
      message,
    });
  }
};

export const sendVerificationEmail = async ({
  fullName,
  email,
  otp,
}: {
  fullName: string;
  email: string;
  otp: string;
}) => {
  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    template: verificationEmailTemplate({ fullName, otp }),
  });
};

export const sendResetPasswordEmail = async ({
  fullName,
  email,
  otp,
}: {
  fullName: string;
  email: string;
  otp: string;
}) => {
  await sendEmail({
    to: email,
    subject: "Reset Password OTP",
    template: resetPasswordTemplate({ fullName, otp }),
  });
};
