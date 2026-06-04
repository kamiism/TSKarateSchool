import { config } from "dotenv";

config({
  path: "./.env",
});

export const PORT = process.env.PORT;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
