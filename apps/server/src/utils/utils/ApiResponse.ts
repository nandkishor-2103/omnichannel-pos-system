class ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  payload: T | null;

  constructor({
    statusCode = 200,
    message = "Success",
    payload = null,
  }: {
    statusCode?: number;
    message?: string;
    payload?: T | null;
  }) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.payload = payload;
  }
}

export default ApiResponse;
