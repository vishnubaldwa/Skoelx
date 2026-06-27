import { Request, Response, NextFunction } from "express";

import ProductService from "../services/product.service.js";

import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";

export default class ProductController {
  private readonly service = new ProductService();

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = createProductSchema.parse(req.body);

      const product = await this.service.create(data);

      return res.status(201).json({
        success: true,
        message: "Product created successfully.",
        data: product,
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

      const search =
        typeof req.query.search === "string"
          ? req.query.search
          : undefined;

      const status =
        typeof req.query.status === "string"
          ? (req.query.status as
              | "ACTIVE"
              | "INACTIVE"
              | "DEVELOPMENT"
              | "RETIRED")
          : undefined;

      const result = await this.service.findAll(
        page,
        limit,
        search,
        status
      );

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
      const product = await this.service.findById(String(req.params.id));

      return res.json({
        success: true,
        data: product,
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
      const data = updateProductSchema.parse(req.body);

      const product = await this.service.update(
        String(req.params.id),
        data
      );

      return res.json({
        success: true,
        message: "Product updated successfully.",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.service.delete(String(req.params.id));

      return res.json({
        success: true,
        message: "Product deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}