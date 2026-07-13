import type { STATUS_CODES } from "../config/constants.ts";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(
    message: string,
    statusCode: STATUS_CODES,
    name: string = "Error",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}
