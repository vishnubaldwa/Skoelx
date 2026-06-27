import { ProductStatus } from "@prisma/client";

export interface CreateProductDto {
  code: string;
  name: string;
  description?: string;
  status?: ProductStatus;
}

export const createProductDefaults: Partial<CreateProductDto> = {
  status: ProductStatus.ACTIVE,
};