import { Request, Response, NextFunction } from "express";

import ActivationService from "../services/activation.service.js";

export default class ActivationController {
  private readonly service =
    new ActivationService();

  activate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const device =
        await this.service.activate(
          req.params.id,
          req.body
        );

      return res.status(201).json({
        success: true,
        message: "Device activated successfully.",
        data: device,
      });
    } catch (error) {
      next(error);
    }
  };
}