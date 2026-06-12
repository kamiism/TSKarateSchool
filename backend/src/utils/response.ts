import type { STATUS_CODES } from "../config/constants.ts";
import type { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
  meta: {
    timestamp: string;
  };
}

export const sendSuccess = <T>(
  res: Response,
  statusCode: STATUS_CODES,
  message: string,
  data?: T,
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };

  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: STATUS_CODES,
  message: string,
  error?: unknown,
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
  res.status(statusCode).json(response);
};
