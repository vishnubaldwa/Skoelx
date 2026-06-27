import { Request, Response, NextFunction } from "express";

import LicenseService from "../services/license.service.js";

import {
  createLicenseSchema,
  updateLicenseSchema,
} from "../validators/license.validator.js";

export default class LicenseController {
  private readonly service = new LicenseService();

  generate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = createLicenseSchema.parse(req.body);

      const license = await this.service.generate(data);

      return res.status(201).json({
        success: true,
        message: "License generated successfully.",
        data: license,
      });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      const result = await this.service.findAll(page, limit);

      return res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const license = await this.service.findById(req.params.id);

      return res.json({
        success: true,
        data: license,
      });
    } catch (error) {
      next(error);
    }
  };

  renew = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = updateLicenseSchema.parse(req.body);

      if (!data.expiresAt) {
        throw new Error("expiresAt is required.");
      }

      const license = await this.service.renew(
        req.params.id,
        data.expiresAt
      );

      return res.json({
        success: true,
        message: "License renewed successfully.",
        data: license,
      });
    } catch (error) {
      next(error);
    }
  };

  suspend = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const license = await this.service.suspend(req.params.id);

      return res.json({
        success: true,
        message: "License suspended successfully.",
        data: license,
      });
    } catch (error) {
      next(error);
    }
  };

  revoke = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const license = await this.service.revoke(req.params.id);

      return res.json({
        success: true,
        message: "License revoked successfully.",
        data: license,
      });
    } catch (error) {
      next(error);
    }
  };
}