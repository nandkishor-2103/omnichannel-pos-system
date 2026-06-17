/* import nodemailer from "nodemailer";
import ENV_VAR from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: ENV_VAR.EMAIL_USER,
    pass: ENV_VAR.EMAIL_PASS,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: SendMailOptions) => {
  await transporter.sendMail({
    from: ENV_VAR.EMAIL_USER,
    to,
    subject,
    html,
  });
}; */

import nodemailer from "nodemailer";
import ENV_VAR from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: ENV_VAR.BREVO_SMTP_USER,
    pass: ENV_VAR.BREVO_SMTP_PASS,
  },
});

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: SendMailOptions) => {
  const info = await transporter.sendMail({
    from: `"POS Pro" <${ENV_VAR.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);
};
