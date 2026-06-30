import type { NextFunction, Request, Response } from "express";
import { User, type UserJwtDataType } from "../../models/User.ts";
import { sendSuccess } from "../../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../../config/constants.ts";
import { AppError } from "../../utils/error.ts";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../../config/env.ts";

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

  async getAccessToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new AppError(
        API_RESPONSE_MESSAGES.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORISED,
      );
    }
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as UserJwtDataType;

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new AppError(
        API_RESPONSE_MESSAGES.NOT_FOUND,
        STATUS_CODES.NOT_FOUND,
      );
    }
    const newToken = user.generateAccessToken();
    res.cookie("accessToken", newToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    sendSuccess(res, STATUS_CODES.OK, "Access token renewed succesfully", {
      accessToken: newToken,
    });
  }
}

export const userAuthController = new UserAuthController();
