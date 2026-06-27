import { Router } from "express";

import CustomerController from "../controllers/customer.controller.js";

import { authenticate } from "../../../middlewares/auth.middleware.js";
import { authorize } from "../../../middlewares/rbac.middleware.js";

const router = Router();

const controller = new CustomerController();

router.use(authenticate);

router.get("/", controller.findAll);

router.get("/:id", controller.findById);

router.post(
  "/",
  authorize("Super Admin"),
  controller.create
);

router.put(
  "/:id",
  authorize("Super Admin"),
  controller.update
);

router.delete(
  "/:id",
  authorize("Super Admin"),
  controller.delete
);

export default router;