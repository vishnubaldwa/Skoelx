import { Router } from "express";

import LicenseController from "../controllers/license.controller.js";

import { authenticate } from "../../../middlewares/auth.middleware.js";
import { authorize } from "../../../middlewares/rbac.middleware.js";

const router = Router();

const controller = new LicenseController();

router.use(authenticate);

router.get(
  "/",
  controller.findAll
);

router.get(
  "/:id",
  controller.findById
);

router.post(
  "/generate",
  authorize("Super Admin"),
  controller.generate
);

router.put(
  "/:id/renew",
  authorize("Super Admin"),
  controller.renew
);

router.put(
  "/:id/suspend",
  authorize("Super Admin"),
  controller.suspend
);

router.put(
  "/:id/revoke",
  authorize("Super Admin"),
  controller.revoke
);

export default router;