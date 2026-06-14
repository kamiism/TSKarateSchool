import { config } from "dotenv";

config({
  path: "./.env",
});

export const PORT = Number(process.env.PORT);
export const CORS_ORIGIN = process.env.CORS_ORIGIN!;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME!;
export const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS);
export const RATE_LIMIT_MAX_REQUESTS = Number(
  process.env.RATE_LIMIT_MAX_REQUESTS,
);
