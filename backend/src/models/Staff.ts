import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../config/env.ts";
import logger from "../utils/logger.ts";

export interface IStaff extends mongoose.Document {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "Admin" | "Moderator";
}

const staffSchema = new mongoose.Schema<IStaff>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [
      /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
      "Please provide a valid email",
    ],
    index: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Moderator",
  },
});

staffSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    logger.error("Failed to hash password");
    throw err;
  }
});

export const Staff = mongoose.model<IStaff>("Staff", staffSchema);
