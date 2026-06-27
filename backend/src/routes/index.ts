import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    service: "Skoelx Licensing API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

export default router;