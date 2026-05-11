class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors: unknown[];

  constructor({
    statusCode = 500,
    message = "Something went wrong",
    errors = [],
    stack = "",
  }: {
    statusCode?: number;
    message?: string;
    errors?: unknown[];
    stack?: string;
  }) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
