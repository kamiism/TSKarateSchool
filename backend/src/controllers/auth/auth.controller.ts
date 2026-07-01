import type { Model } from "mongoose";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../../config/constants.ts";
import { REFRESH_TOKEN_SECRET } from "../../config/env.ts";
import { AppError } from "../../utils/error.ts";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendSuccess } from "../../utils/response.ts";
import type { UserJwtDataType } from "../../models/User.ts";
import type { StaffJwtDataType } from "../../models/Staff.ts";

interface IMethods {
  generateAccessToken: () => {};
  generateRefreshToken: () => {};
}

type JwtDataType = UserJwtDataType | StaffJwtDataType;

export class AuthController<T> {
  constructor(private readonly model: Model<T, {}, IMethods>) {}
  async getAccessToken(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new AppError(
        API_RESPONSE_MESSAGES.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORISED,
      );
    }
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtDataType;

    const user = await this.model.findById(decoded._id);
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
