import { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default class ApiResponse {
  static success(
    res: Response,
    data: unknown,
    message = "Success",
    statusCode = 200
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static created(
    res: Response,
    data: unknown,
    message = "Created successfully"
  ) {
    return res.status(201).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static paginated(
    res: Response,
    data: unknown,
    pagination: PaginationMeta,
    message = "Success"
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode = 500,
    errors?: unknown
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}