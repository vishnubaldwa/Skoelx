import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { loginSchema } from "../validators/login.validator.js";
import { authLimiter } from "../../../middlewares/rate-limit.middleware.js";

const router = Router();

router.post(
  "/login",
  authLimiter,
  controller.login
);

export default router;