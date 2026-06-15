import { Router } from "express";
import { userAuthController } from "../controllers/auth/userAuth.controller.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { validate } from "../middlewares/auth.middleware.ts";
import { registerSchema } from "../validators/auth.validator.ts";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  asyncHandler(userAuthController.register),
);

export default authRouter;
