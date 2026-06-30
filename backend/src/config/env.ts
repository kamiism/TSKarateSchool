import { config } from "dotenv";
import type { SignOptions } from "jsonwebtoken";

config({
  path: "./.env",
});

export const PORT = Number(process.env.PORT) || 3000;
export const CORS_ORIGIN = process.env.CORS_ORIGIN!;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME!;
export const RATE_LIMIT_WINDOW_MS =
  Number(process.env.RATE_LIMIT_WINDOW_MS) || 600000;
export const RATE_LIMIT_MAX_REQUESTS =
  Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
export const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY!;

export const MAIN_ADMIN_NAME = process.env.MAIN_ADMIN_NAME!;
export const MAIN_ADMIN_USERNAME = process.env.MAIN_ADMIN_USERNAME!;
export const MAIN_ADMIN_EMAIL = process.env.MAIN_ADMIN_EMAIL!;
export const MAIN_ADMIN_PASSWORD = process.env.MAIN_ADMIN_PASSWORD!;
