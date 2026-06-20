import { Router } from "express";
import { userAuthController } from "../controllers/auth/userAuth.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { validate, verifyJwt } from "../middlewares/auth.middleware.ts";
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

authRouter.post(
  "/logout/user",
  asyncHandler(verifyJwt),
  asyncHandler(userAuthController.logout),
);

authRouter.post("/", asyncHandler(userAuthController.getAccessToken));

export default authRouter;
