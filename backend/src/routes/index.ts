import { Router } from "express";
import prisma from "../config/database.js";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      application: "Skoelx",
      database: "Connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      database: "Disconnected",
      error,
    });
  }
});

export default router;