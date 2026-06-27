import { Request, Response, NextFunction } from "express";

import ValidationService from "../services/validation.service.js";

export default class ValidationController {
  private readonly service =
    new ValidationService();

  validate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result =
        await this.service.validate(
          req.body.licenseKey,
          req.body
        );

      return res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}