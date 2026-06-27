import { Response } from "express";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: unknown;
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200,
    meta?: unknown
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    } satisfies ApiResponse<T>);
  }

  static created<T>(
    res: Response,
    message: string,
    data?: T
  ) {
    return this.success(res, message, data, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}