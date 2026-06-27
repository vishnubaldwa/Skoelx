import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { validate } from "../../../middlewares/validation.middleware.js";
import { loginSchema } from "../validators/login.validator.js";

const router = Router();

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

export default router;