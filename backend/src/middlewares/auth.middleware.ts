import type { NextFunction, Request, Response } from "express";
import { ZodType, treeifyError } from "zod";
import { sendError } from "../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../config/constants.ts";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body);

    if (!success) {
      sendError(
        res,
        STATUS_CODES.BAD_REQUEST,
        API_RESPONSE_MESSAGES.BAD_REQUEST,
        treeifyError(error),
      );
      return;
    }

    req.body = data;

    next();
  };
};
