import { Router } from "express";
import { userAuthController } from "../controllers/auth/userAuth.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import {
  validate,
  verifyStaffJwt,
  verifyUserJwt,
} from "../middlewares/auth.middleware.ts";
import {
  loginSchema,
  registerSchema,
  staffCreateSchema,
  staffLoginSchema,
} from "../validators/auth.validator.ts";
import { staffAuthController } from "../controllers/auth/staffAuth.controller.ts";

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
  asyncHandler(verifyUserJwt),
  asyncHandler(userAuthController.logout),
);

authRouter.post(
  "/access-token",
  asyncHandler(userAuthController.getAccessToken),
);

authRouter.post(
  "/login/staff",
  validate(staffLoginSchema),
  asyncHandler(staffAuthController.login),
);

authRouter.post(
  "/create/staff",
  verifyStaffJwt,
  validate(staffCreateSchema),
  asyncHandler(staffAuthController.create),
);

export default authRouter;
