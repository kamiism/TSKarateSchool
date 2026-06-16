import { Router } from "express";
import { userAuthController } from "../controllers/auth/userAuth.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { validate } from "../middlewares/auth.middleware.ts";
import { loginSchema, registerSchema } from "../validators/auth.validator.ts";

const authRouter = Router();

authRouter.post(
  "/register/user",
  validate(registerSchema),
  asyncHandler(userAuthController.register),
);

authRouter.post(
  "/login/user",
  validate(loginSchema),
  asyncHandler(userAuthController.login),
);

export default authRouter;
