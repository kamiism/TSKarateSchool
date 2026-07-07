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
import { AuthController } from "../controllers/auth/auth.controller.ts";
import { User } from "../models/User.ts";
import { Staff } from "../models/Staff.ts";
import { upload } from "../config/multer.ts";

const authRouter = Router();
const userAuth = new AuthController(User);
const staffAuth = new AuthController(Staff);

authRouter.post(
  "/register/user",
  validate(registerSchema),
  upload.single("passport"),
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

authRouter.post("/user/access-token", asyncHandler(userAuth.getAccessToken));
authRouter.post("/staff/access-token", asyncHandler(staffAuth.getAccessToken));

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
