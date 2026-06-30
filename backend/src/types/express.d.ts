import type { IStaff } from "../models/Staff.ts";
import type { IUser } from "../models/User.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      staff?: IStaff;
    }
  }
}

export {};
