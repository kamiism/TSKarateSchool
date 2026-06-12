import type { NextFunction, Request, Response } from "express";

type asyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler =
  (fn: asyncController) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
