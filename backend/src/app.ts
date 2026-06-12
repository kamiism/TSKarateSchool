import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import {
  CORS_ORIGIN,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from "./config/env.js";
import router from "./routes/router.ts";
import rateLimit from "express-rate-limit";

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_MAX_REQUESTS,
  handler: (req: Request, res: Response, next: NextFunction) => {}, // TODO: I will update this whenever i will setup response handler
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api");
app.use("/api/v1", router);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default app;
