import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  BCRYPT_ROUNDS,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../config/env.ts";
import logger from "../utils/logger.ts";
import jwt, { type SignOptions } from "jsonwebtoken";

export interface IStaff extends mongoose.Document {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "Main Admin" | "Admin" | "Moderator";
  refreshToken: string;
}

interface IStaffMethods {
  generateRefreshToken: () => string;
  generateAccessToken: () => string;
}

type StaffModel = Model<IStaff, {}, IStaffMethods>;

const staffSchema = new mongoose.Schema<IStaff, StaffModel, IStaffMethods>({
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
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
  refreshToken: {
    type: String,
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

staffSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"],
    },
  );
};

staffSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
    },
  );
};

export type StaffJwtDataType = {
  _id: string;
  username?: string;
  email?: string;
  role?: string;
};

export const Staff = mongoose.model<IStaff, StaffModel>("Staff", staffSchema);
