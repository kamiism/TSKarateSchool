import express, {
  type Express,
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
import helmet from "helmet";
import { sendError } from "./utils/response.ts";
import { API_RESPONSE_MESSAGES, STATUS_CODES } from "./config/constants.ts";
import { notFoundHandler } from "./handlers/notFoundHandler.ts";
import { errorHandler } from "./handlers/errorHandler.ts";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN || "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_MAX_REQUESTS,
  handler: (req: Request, res: Response, next: NextFunction) => {
    sendError(
      res,
      STATUS_CODES.MANY_REQUEST,
      API_RESPONSE_MESSAGES.TOO_MANY_REQUESTS,
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);
app.use("/api/v1", router);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
