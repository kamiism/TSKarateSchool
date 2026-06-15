import type { NextFunction, Request, Response } from "express";

export class UserAuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {}
}

export const userAuthController = new UserAuthController();
