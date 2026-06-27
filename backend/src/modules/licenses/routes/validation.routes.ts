import { Router } from "express";

import ValidationController from "../controllers/validation.controller.js";
import { validationLimiter } from "../../../middlewares/rate-limit.middleware.js";

const router = Router();

const controller =
  new ValidationController();

router.post(
  "/validate",
  validationLimiter,
  controller.validate
);

export default router;