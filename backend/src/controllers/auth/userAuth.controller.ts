import type { NextFunction, Request, Response } from "express";
import { User } from "../../models/User.ts";
import { sendSuccess } from "../../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../../config/constants.ts";

export class UserAuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await User.create(req.body);

    sendSuccess(res, STATUS_CODES.CREATED, API_RESPONSE_MESSAGES.CREATED, {
      username: user.username,
      email: user.email,
    }); // TODO: Might change the data part
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {}
}

export const userAuthController = new UserAuthController();
