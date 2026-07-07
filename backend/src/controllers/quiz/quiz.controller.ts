import type { NextFunction, Request, Response } from "express";
import { Quiz } from "../../models/Quiz.ts";
import {
  API_RESPONSE_MESSAGES,
  STAFF_ROLES,
  STATUS_CODES,
} from "../../config/constants.ts";
import { sendError, sendSuccess } from "../../utils/response.ts";

export class QuizController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (!(req.staff?.role == STAFF_ROLES.MAIN_ADMIN)) {
      return sendError(
        res,
        STATUS_CODES.FORBIDDEN,
        API_RESPONSE_MESSAGES.FORBIDDEN,
      );
    }
    const quiz = await Quiz.create(req.body);
    sendSuccess(res, STATUS_CODES.CREATED, API_RESPONSE_MESSAGES.CREATED, {
      quiz,
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {}
}

export const quizController = new QuizController();
