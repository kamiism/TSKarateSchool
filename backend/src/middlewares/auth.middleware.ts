import type { NextFunction, Request, Response } from "express";
import { ZodType, treeifyError } from "zod";
import { sendError } from "../utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "../config/constants.ts";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.ts";
import { User, type UserJwtDataType } from "../models/User.ts";
import { AppError } from "../utils/error.ts";
import { Staff, type StaffJwtDataType } from "../models/Staff.ts";

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

export const verifyUserJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as UserJwtDataType;
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new AppError(
        API_RESPONSE_MESSAGES.NOT_FOUND,
        STATUS_CODES.NOT_FOUND,
      );
    }
    req.user = user;
    next();
  } catch (error: any) {
    throw new AppError(
      error.message || "Invalid jwt token",
      STATUS_CODES.BAD_REQUEST,
    );
  }
};

export const verifyStaffJwt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as StaffJwtDataType;
    const staff = await Staff.findById(decoded._id);
    if (!staff) {
      throw new AppError(
        API_RESPONSE_MESSAGES.NOT_FOUND,
        STATUS_CODES.NOT_FOUND,
      );
    }
    req.staff = staff;
    next();
  } catch (error: any) {
    throw new AppError(
      error.message || "Invalid jwt token",
      STATUS_CODES.BAD_REQUEST,
    );
  }
};
