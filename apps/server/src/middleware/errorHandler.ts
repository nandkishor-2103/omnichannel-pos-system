import type { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;

  errors?: unknown[];

  file?: string;
  line?: number;
  column?: number;
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const statusCode = err?.statusCode || 500;

  const response: ErrorResponse = {
    success: false,
    statusCode,
    message: err?.message || "Internal Server Error",
  };

  if (process.env.NODE_ENV === "development") {
    const stackLines =
      err?.stack
        ?.split("\n")
        ?.map((line: string) => line.trim())
        ?.filter(
          (line: string) =>
            line &&
            !line.includes("node_modules") &&
            !line.includes("Layer.handleRequest") &&
            !line.includes("Route.dispatch") &&
            !line.includes("router") &&
            !line.includes("asyncHandler")
        ) || [];

    const errorLocation = stackLines.find(
      (line: string) => line.includes(".ts:") || line.includes(".js:")
    );

    let file: string | undefined;
    let line: number | undefined;
    let column: number | undefined;

    if (errorLocation) {
      const match = errorLocation.match(/([^\\/]+\.(ts|js)):(\d+):(\d+)/);

      if (match) {
        file = match[1];
        line = Number(match[3]);
        column = Number(match[4]);
      }
    }

    response.errors =
      Array.isArray(err?.errors) && err.errors.length > 0
        ? err.errors
        : [err?.message ?? "Unknown Error"];

    if (file) {
      response.file = file;
    }

    if (line !== undefined) {
      response.line = line;
    }

    if (column !== undefined) {
      response.column = column;
    }
  }

  /**
   * Production:
   * Show validation errors only
   */
  if (
    process.env.NODE_ENV === "production" &&
    Array.isArray(err?.errors) &&
    err.errors.length > 0
  ) {
    response.errors = err.errors;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
