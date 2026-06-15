import type { Request, Response } from "express";
import { sendError } from "../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../config/constants.ts";

export const notFoundHandler = (req: Request, res: Response): void => {
  sendError(res, STATUS_CODES.NOT_FOUND, API_RESPONSE_MESSAGES.NOT_FOUND);
};
