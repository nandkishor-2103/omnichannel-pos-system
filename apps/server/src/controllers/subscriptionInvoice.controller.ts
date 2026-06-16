import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import {
  getSubscriptionInvoicesService,
  getSubscriptionInvoiceByIdService,
  resendSubscriptionInvoiceService,
  getSubscriptionInvoiceForDownloadService,
} from "../services/subscriptionInvoice.service.js";
import { generateSubscriptionInvoicePdf } from "../utils/generateSubscriptionInvoicePdf.js";

export const getSubscriptionInvoicesController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.user?.store?.toString();

    const invoices = await getSubscriptionInvoicesService(storeId!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Invoices fetched successfully",
        payload: {
          invoices,
        },
      })
    );
  }
);

export const getSubscriptionInvoiceByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.user?.store?.toString();

    const invoice = await getSubscriptionInvoiceByIdService(
      req.params.invoiceId as string,
      storeId!
    );

    if (!invoice) {
      throw new ApiError({
        statusCode: 404,
        message: "Invoice not found",
      });
    }

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Invoice fetched successfully",
        payload: {
          invoice,
        },
      })
    );
  }
);

// ==================================================
// RESEND INVOICE CONTROLLER
// ==================================================
export const resendSubscriptionInvoiceController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.user?.store?.toString();

    const invoice = await resendSubscriptionInvoiceService(
      req.params.invoiceId as string,
      storeId!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Invoice sent successfully",
        payload: {
          invoice,
        },
      })
    );
  }
);

// ==================================================
// DOWNLOAD INVOICE CONTROLLER
// ==================================================
export const downloadSubscriptionInvoiceController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.user?.store?.toString();

    const invoice = await getSubscriptionInvoiceForDownloadService(
      req.params.invoiceId as string,
      storeId!
    );

    if (!invoice) {
      throw new ApiError({
        statusCode: 404,
        message: "Invoice not found",
      });
    }

    const pdfBuffer = await generateSubscriptionInvoicePdf(invoice);

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceNumber}.pdf`
    );

    return res.send(pdfBuffer);
  }
);
