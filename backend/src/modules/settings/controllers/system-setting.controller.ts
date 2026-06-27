import { Request, Response, NextFunction } from "express";

import SystemSettingService from "../services/system-setting.service.js";

export default class SystemSettingController {
  private readonly service =
    new SystemSettingService();

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const settings =
        await this.service.getAll();

      return res.json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const setting =
        await this.service.set(
          req.body.key,
          req.body.value,
          req.body.description
        );

      return res.json({
        success: true,
        data: setting,
      });
    } catch (error) {
      next(error);
    }
  };
}