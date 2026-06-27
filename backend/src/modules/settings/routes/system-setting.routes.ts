import { Router } from "express";

import SystemSettingController from "../controllers/system-setting.controller.js";

import { authenticate } from "../../../middlewares/auth.middleware.js";
import { authorize } from "../../../middlewares/rbac.middleware.js";

const router = Router();

const controller =
  new SystemSettingController();

router.use(authenticate);

router.get(
  "/",
  controller.getAll
);

router.put(
  "/",
  authorize("Super Admin"),
  controller.update
);

export default router;