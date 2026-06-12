import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { Order } from "@/app/store/order/orderTypes";

type JsPdfWithAutoTable = jsPDF & {
  lastAutoTable: {
    finalY: number;
  };
};

export const generateInvoice = (order: Order) => {
  const doc = new jsPDF();

  // ===== Header =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("DMART POS INVOICE", 105, 20, {
    align: "center",
  });

  doc.setDrawColor(0);
  doc.line(14, 25, 196, 25);

  // ===== Order Info =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(`Order ID: ${order.id}`, 14, 38);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleString("en-IN")}`, 14, 45);

  doc.text(`Customer: ${order.customer.fullName}`, 14, 52);
  doc.text(`Phone: ${order.customer.phone}`, 14, 59);

  doc.text(`Cashier: ${order.cashier.fullName}`, 120, 52);
  doc.text(`Payment: ${order.paymentType}`, 120, 59);

  // ===== Products =====
  autoTable(doc, {
    startY: 70,

    head: [["Product", "SKU", "Qty", "Unit Price", "Subtotal"]],

    body: order.items.map((item) => [
      item.product?.name ?? "-",
      item.product?.sku ?? "-",
      item.quantity,
      `Rs. ${item.product?.sellingPrice ?? item.price}`,
      `Rs. ${item.price}`,
    ]),

    styles: {
      fontSize: 10,
    },

    headStyles: {
      fillColor: [22, 101, 52],
    },

    columnStyles: {
      2: { halign: "center" },
      3: { halign: "right" },
      4: { halign: "right" },
    },
  });

  const finalY = (doc as JsPdfWithAutoTable).lastAutoTable.finalY;

  // ===== Total =====
  doc.setDrawColor(180);
  doc.line(120, finalY + 10, 196, finalY + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  doc.text(`Total Amount: Rs. ${order.totalAmount.toFixed(2)}`, 196, finalY + 20, {
    align: "right",
  });

  // ===== Footer =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text("Thank you for shopping with us!", 105, finalY + 35, {
    align: "center",
  });

  // Open in new tab instead of auto download
  window.open(doc.output("bloburl"), "_blank");
};
