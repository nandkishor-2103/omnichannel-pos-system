import PDFDocument from "pdfkit";

import type { SubscriptionInvoiceDocument } from "../models/subscriptionInvoice.model.js";

export const generateSubscriptionInvoicePdf = (
  invoice: SubscriptionInvoiceDocument
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50,
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", reject);

    doc.fontSize(22).text("Subscription Invoice", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`Invoice Number: ${invoice.invoiceNumber}`);

    doc.text(`Amount: ₹${invoice.amount}`);

    doc.text(`Status: ${invoice.status}`);

    doc.text(`Issued At: ${new Date(invoice.issuedAt).toLocaleString()}`);

    doc.moveDown();

    doc.text("Thank you for choosing our POS platform.");

    doc.end();
  });
};
