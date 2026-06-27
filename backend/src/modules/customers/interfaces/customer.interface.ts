import { CustomerStatus } from "@prisma/client";

export interface CreateCustomerInput {
  customerCode: string;
  organizationName: string;
  country?: string;
  timezone?: string;
  status?: CustomerStatus;
}

export interface UpdateCustomerInput {
  organizationName?: string;
  country?: string;
  timezone?: string;
  status?: CustomerStatus;
}

export interface CustomerFilters {
  search?: string;
  status?: CustomerStatus;
  page?: number;
  limit?: number;
}

export interface CustomerResponse {
  id: string;
  customerCode: string;
  organizationName: string;
  country: string | null;
  timezone: string | null;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
}