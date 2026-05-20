import type { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  success: boolean;
  message: string;
  errors: unknown[];
  stack?: string[];
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const statusCode: number = err?.statusCode || 500;

  const response: ErrorResponse = {
    success: false,
    message: err?.message || "Internal Server Error",
    errors: err?.errors || [],
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err?.stack
      ?.split("\n")
      .map((line: string) => line.trim())
      .filter(
        (line: string) =>
          line &&
          !line.includes("node_modules") &&
          !line.includes("router") &&
          !line.includes("Layer.handleRequest") &&
          !line.includes("Route.dispatch") &&
          !line.includes("asyncHandler")
      );
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
