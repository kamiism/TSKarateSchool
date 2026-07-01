import type { NextFunction, Request, Response } from "express";
import { MAIN_ADMIN_EMAIL, MAIN_ADMIN_USERNAME } from "../../config/env.ts";
import { sendError, sendSuccess } from "../../utils/response.ts";
import {
  API_RESPONSE_MESSAGES,
  STAFF_ROLES,
  STATUS_CODES,
} from "../../config/constants.ts";
import { Staff } from "../../models/Staff.ts";
import bcrypt from "bcrypt";

export class StaffAuthController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (
      !(
        req.staff?.username == MAIN_ADMIN_USERNAME &&
        req.staff.email == MAIN_ADMIN_EMAIL &&
        req.staff.role == STAFF_ROLES.MAIN_ADMIN
      )
    ) {
      return sendError(
        res,
        STATUS_CODES.FORBIDDEN,
        API_RESPONSE_MESSAGES.FORBIDDEN,
      );
    }

    const existingStaff = await Staff.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingStaff) {
      return sendError(
        res,
        STATUS_CODES.CONFLICT,
        API_RESPONSE_MESSAGES.CONFLICT,
      );
    }

    const newStaff = new Staff(req.body);
    await newStaff.save();

    sendSuccess(res, STATUS_CODES.CREATED, API_RESPONSE_MESSAGES.CREATED);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { identifier, password } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    let user = null;
    if (regex.test(identifier)) {
      user = await Staff.findOne({ email: identifier });
    } else {
      user = await Staff.findOne({ username: identifier });
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
      accessToken,
    });
  }
}

export const staffAuthController = new StaffAuthController();
