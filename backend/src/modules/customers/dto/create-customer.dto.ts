import { CustomerStatus } from "@prisma/client";

export interface CreateCustomerDto {
  customerCode: string;
  organizationName: string;
  country?: string;
  timezone?: string;
  status?: CustomerStatus;
}

export const createCustomerDefaults: Partial<CreateCustomerDto> = {
  status: CustomerStatus.ACTIVE,
};