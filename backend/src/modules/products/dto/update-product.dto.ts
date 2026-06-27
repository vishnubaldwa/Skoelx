import { ProductStatus } from "@prisma/client";

export interface UpdateProductDto {
  code?: string;
  name?: string;
  description?: string;
  status?: ProductStatus;
}