import { Response } from "express";

import ApiResponse from "../responses/api.response.js";

export default abstract class BaseController {
  protected ok(
    res: Response,
    data: unknown,
    message = "Success"
  ) {
    return ApiResponse.success(
      res,
      data,
      message
    );
  }

  protected created(
    res: Response,
    data: unknown,
    message = "Created successfully"
  ) {
    return ApiResponse.created(
      res,
      data,
      message
    );
  }

  protected paginated(
    res: Response,
    data: unknown,
    pagination: unknown,
    message = "Success"
  ) {
    return ApiResponse.paginated(
      res,
      data,
      pagination as never,
      message
    );
  }
}