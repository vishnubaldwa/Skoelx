import { z } from "zod";
import { CustomerStatus } from "@prisma/client";

export const createCustomerSchema = z.object({
  customerCode: z
    .string()
    .trim()
    .min(2, "Customer code must be at least 2 characters")
    .max(20, "Customer code cannot exceed 20 characters")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Customer code must contain only uppercase letters, numbers, underscores or hyphens"
    ),

  organizationName: z
    .string()
    .trim()
    .min(3, "Organization name must be at least 3 characters")
    .max(150, "Organization name cannot exceed 150 characters"),

  country: z
    .string()
    .trim()
    .max(100)
    .optional(),

  timezone: z
    .string()
    .trim()
    .max(100)
    .optional(),

  status: z.nativeEnum(CustomerStatus).optional(),
});

export const updateCustomerSchema = z.object({
  organizationName: z
    .string()
    .trim()
    .min(3)
    .max(150)
    .optional(),

  country: z
    .string()
    .trim()
    .max(100)
    .optional(),

  timezone: z
    .string()
    .trim()
    .max(100)
    .optional(),

  status: z.nativeEnum(CustomerStatus).optional(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;