import type { NextFunction, Request, Response } from "express";
import { User, type UserJwtDataType } from "../../models/User.ts";
import { sendError, sendSuccess } from "../../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../../config/constants.ts";
import { AppError } from "../../utils/error.ts";
import bcrypt from "bcrypt";

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
    const passportPhoto = req.file?.path as string;
    user.passportPhoto = passportPhoto;

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
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName || "",
      lastName: user.lastName,
      points: user.points,
      mode: user.mode,
      accessToken,
    }); // TODO: Might change the data part
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { identifier, password } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let user = null;
    if (regex.test(identifier)) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      return sendError(
        res,
        STATUS_CODES.NOT_FOUND,
        API_RESPONSE_MESSAGES.NOT_FOUND,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, STATUS_CODES.UNAUTHORISED, "Invalid password");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(res, STATUS_CODES.OK, API_RESPONSE_MESSAGES.SUCCESS, {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName || "",
      lastName: user.lastName,
      points: user.points,
      mode: user.mode,
      accessToken,
    });
  }

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

  async userProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return sendError(
        res,
        STATUS_CODES.NOT_FOUND,
        API_RESPONSE_MESSAGES.NOT_FOUND,
      );
    }

    sendSuccess(res, STATUS_CODES.OK, API_RESPONSE_MESSAGES.SUCCESS, {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName || "",
      lastName: user.lastName,
      points: user.points,
      mode: user.mode,
    });
  }
}

export const userAuthController = new UserAuthController();
