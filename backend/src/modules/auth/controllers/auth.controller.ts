import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.js";
import { loginSchema } from "../validators/login.validator.js";

class AuthController {
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const payload = loginSchema.parse(req.body);

      const result = await authService.login(payload);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();