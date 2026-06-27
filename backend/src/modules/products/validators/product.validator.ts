import { z } from "zod";
import { ProductStatus } from "@prisma/client";

export const createProductSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, "Product code must be at least 2 characters")
    .max(20, "Product code cannot exceed 20 characters")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Product code must contain only uppercase letters, numbers, underscores or hyphens"
    ),

  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  status: z.nativeEnum(ProductStatus).optional(),
});

export const updateProductSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2)
    .max(20)
    .regex(/^[A-Z0-9_-]+$/)
    .optional(),

  name: z
    .string()
    .trim()
    .min(3)
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  status: z.nativeEnum(ProductStatus).optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;