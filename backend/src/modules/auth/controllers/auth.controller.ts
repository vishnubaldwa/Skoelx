import { Request, Response, NextFunction } from "express";

import authService from "../services/auth.service.js";
import { loginSchema } from "../validators/login.validator.js";
import { ResponseUtil } from "../../../utils/response.js";

class AuthController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = loginSchema.parse(req.body);

      const result = await authService.login(payload);

      return ResponseUtil.success(
        res,
        "Login successful",
        result
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();