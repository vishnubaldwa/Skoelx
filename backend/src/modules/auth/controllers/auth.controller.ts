import { Request, Response } from "express";

import authService from "../services/auth.service.js";
import { ResponseUtil } from "../../../utils/response.js";
import { asyncHandler } from "../../../middlewares/async.middleware.js";

class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    return ResponseUtil.success(
      res,
      "Login successful",
      result
    );
  });
}

export default new AuthController();