import { Router } from "express";
import authRouter from "./auth.routes.ts";
import quizRouter from "./quiz.routes.ts";

const router = Router();

router.use("/auth", authRouter);
router.use("/quiz", quizRouter);

export default router;
