import { Request, Response, NextFunction } from "express";

import CustomerService from "../services/customer.service.js";

import {
  createCustomerSchema,
  updateCustomerSchema,
} from "../validators/customer.validator.js";

export default class CustomerController {
  private readonly service = new CustomerService();

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = createCustomerSchema.parse(req.body);

      const customer = await this.service.create(data);

      return res.status(201).json({
        success: true,
        message: "Customer created successfully.",
        data: customer,
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
              | "SUSPENDED")
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
      const customer = await this.service.findById(String(String(req.params.id)));

      return res.json({
        success: true,
        data: customer,
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
      const data = updateCustomerSchema.parse(req.body);

      const customer = await this.service.update(
        String(String(req.params.id)),
        data
      );

      return res.json({
        success: true,
        message: "Customer updated successfully.",
        data: customer,
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
      await this.service.delete(String(String(req.params.id)));

      return res.json({
        success: true,
        message: "Customer deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  };
}