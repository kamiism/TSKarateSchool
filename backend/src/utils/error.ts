import type { STATUS_CODES } from "../config/constants.ts";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: STATUS_CODES) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
