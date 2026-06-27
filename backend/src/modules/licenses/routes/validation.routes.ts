import { Router } from "express";

import ValidationController from "../controllers/validation.controller.js";

const router = Router();

const controller =
  new ValidationController();

router.post(
  "/validate",
  controller.validate
);

export default router;