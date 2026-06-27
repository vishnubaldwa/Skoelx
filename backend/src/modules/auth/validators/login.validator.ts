import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address")
    .trim()
    .toLowerCase(),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must contain at least 8 characters")
    .max(100)
});

export type LoginDto = z.infer<typeof loginSchema>;