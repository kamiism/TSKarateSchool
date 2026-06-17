import type { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../config/constants.ts";

export const errorHandler = (err: any, req: Request, res: Response) => {
  if (err.code == 11000) {
    sendError(res, STATUS_CODES.CONFLICT, API_RESPONSE_MESSAGES.CONFLICT);
    return;
  }
  sendError(
    res,
    STATUS_CODES.SERVER_ERROR,
    API_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
  );
};
// TODO: have to update later
