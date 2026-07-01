import type { NextFunction, Request, Response } from "express";
import { User, type UserJwtDataType } from "../../models/User.ts";
import { sendSuccess } from "../../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../../config/constants.ts";
import { AppError } from "../../utils/error.ts";

export class UserAuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await User.create(req.body);

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, STATUS_CODES.CREATED, API_RESPONSE_MESSAGES.CREATED, {
      username: user.username,
      email: user.email,
    }); // TODO: Might change the data part
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {}

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new AppError(
        API_RESPONSE_MESSAGES.NOT_FOUND,
        STATUS_CODES.NOT_FOUND,
      );
    }

    user.refreshToken = "";
    user?.save({ validateBeforeSave: false });

    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      })
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
      });

    sendSuccess(res, STATUS_CODES.OK, API_RESPONSE_MESSAGES.SUCCESS);
  }
}

export const userAuthController = new UserAuthController();
