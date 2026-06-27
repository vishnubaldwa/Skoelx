import { Request, Response, NextFunction } from "express";

import DashboardService from "../services/dashboard.service.js";

export default class DashboardController {
  private readonly service =
    new DashboardService();

  getDashboard = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dashboard =
        await this.service.getDashboard();

      return res.json({
        success: true,
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  };
}