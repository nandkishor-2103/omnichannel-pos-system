import type { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(err?.statusCode || 500).json({
    success: false,
    message: err?.message || "Internal Server Error",
    errors: err?.errors || [],
  });
};

export default errorHandler;
