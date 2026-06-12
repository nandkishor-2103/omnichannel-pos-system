import axios from "axios";
import { toast } from "sonner";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "Request failed";
  }

  return "Something went wrong";
};

const APP_CONFIG = {
  TEST_LOADING: import.meta.env.TEST_LOADING_DEV,
  TEST_LOADING_DELAY: import.meta.env.TEST_LOADING_DELAY_DEV,
};

const IGNORED_TOAST_MESSAGES = ["No active shift found"];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/**
 * Request Interceptor
 * Central Loading Delay Hub
 */
api.interceptors.request.use(
  async (config) => {
    if (APP_CONFIG.TEST_LOADING) {
      await new Promise((resolve) => setTimeout(resolve, APP_CONFIG.TEST_LOADING_DELAY));
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Central Toast Hub
 */
api.interceptors.response.use(
  (response) => {
    const data = response.data;

    // Success toast only for non-GET requests
    if (
      data?.success === true &&
      data?.message &&
      response.config.method?.toLowerCase() !== "get"
    ) {
      toast.success(data.message);
    }

    return response;
  },

  (error) => {
    const data = error.response?.data;

    const status = data?.statusCode ?? error.response?.status;

    const message = data?.message || "Something went wrong";

    const silentMessages = IGNORED_TOAST_MESSAGES;

    if (silentMessages.includes(message)) {
      return Promise.reject(error);
    }

    switch (status) {
      // Validation / User Action Issues
      case 400: // Bad Request
      case 401: // Unauthorized
      case 403: // Forbidden
      case 409: // Conflict
      case 422: // Validation Error
        toast.warning(message);
        break;

      // Resource Issues
      case 404: // Not Found
        toast.info(message);
        break;

      // Rate Limiting
      case 429: // Too Many Requests
        toast.warning(message);
        break;

      // Server Errors
      case 500: // Internal Server Error
      case 501: // Not Implemented
      case 502: // Bad Gateway
      case 503: // Service Unavailable
      case 504: // Gateway Timeout
        toast.error(message);
        break;

      default:
        // Network error, CORS, server down, etc.
        if (!error.response) {
          toast.error(
            "Unable to connect to server. Please check your internet connection."
          );
        } else {
          toast.error(message);
        }
    }

    return Promise.reject(error);
  }
);

export { api };
