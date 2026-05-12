import nodemailer from "nodemailer";
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
};
