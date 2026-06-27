import { z } from "zod";
import { LicenseStatus } from "@prisma/client";

export const createLicenseSchema = z.object({
  customerId: z.string().cuid(),

  productId: z.string().cuid(),

  planId: z.string().cuid().optional(),

  expiresAt: z.coerce.date(),
});

export const updateLicenseSchema = z.object({
  expiresAt: z.coerce.date().optional(),

  status: z.nativeEnum(LicenseStatus).optional(),
});

export type CreateLicenseSchema = z.infer<typeof createLicenseSchema>;
export type UpdateLicenseSchema = z.infer<typeof updateLicenseSchema>;