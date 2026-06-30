import type { NextFunction, Request, Response } from "express";

export class StaffAuthController {
  async create(req: Request, res: Response, next: NextFunction) {}

  async login(req: Request, res: Response, next: NextFunction) {}
}

export const staffAuthController = new StaffAuthController();
