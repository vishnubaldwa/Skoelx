import { Router } from "express";
import prisma from "../config/database.js";
import authRoutes from "../modules/auth/routes/auth.routes.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      application: "Skoelx",
      database: "Connected",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(500).json({
      success: false,
      database: "Disconnected",
    });
  }
});

router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.use("/auth", authRoutes);

export default router;