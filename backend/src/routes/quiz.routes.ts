import { Router } from "express";
import { validate, verifyStaffJwt } from "../middlewares/auth.middleware.ts";
import { quizCreateSchema } from "../validators/quiz.validator.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { quizController } from "../controllers/quiz/quiz.controller.ts";

const quizRouter = Router();

quizRouter.post(
  "/create",
  validate(quizCreateSchema),
  verifyStaffJwt,
  asyncHandler(quizController.create),
);

export default quizRouter;
