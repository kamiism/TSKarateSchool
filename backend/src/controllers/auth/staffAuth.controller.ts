import type { NextFunction, Request, Response } from "express";
import { MAIN_ADMIN_EMAIL, MAIN_ADMIN_USERNAME } from "../../config/env.ts";
import { sendError, sendSuccess } from "../../utils/response.ts";
import {
  API_RESPONSE_MESSAGES,
  STAFF_ROLES,
  STATUS_CODES,
} from "../../config/constants.ts";
import { Staff } from "../../models/Staff.ts";

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

  async login(req: Request, res: Response, next: NextFunction) {}
}

export const staffAuthController = new StaffAuthController();
