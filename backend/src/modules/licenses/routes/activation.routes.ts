import { Router } from "express";

import ActivationController from "../controllers/activation.controller.js";

import { authenticate } from "../../../middlewares/auth.middleware.js";

const router = Router();

const controller =
  new ActivationController();

router.post(
  "/:id/activate",
  authenticate,
  controller.activate
);

export default router;