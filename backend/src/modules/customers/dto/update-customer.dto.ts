import { CustomerStatus } from "@prisma/client";

export interface UpdateCustomerDto {
  organizationName?: string;
  country?: string;
 timezone?: string;
  status?: CustomerStatus;
}