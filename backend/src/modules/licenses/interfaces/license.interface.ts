import { LicenseStatus } from "@prisma/client";

export interface CreateLicenseInput {
  customerId: string;
  productId: string;
  planId?: string;
  expiresAt: Date;
}

export interface UpdateLicenseInput {
  expiresAt?: Date;
  status?: LicenseStatus;
}

export interface LicenseFilters {
  customerId?: string;
  productId?: string;
  status?: LicenseStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface LicenseResponse {
  id: string;
  licenseKey: string;
  customerId: string;
  productId: string;
  planId: string | null;
  status: LicenseStatus;
  issuedAt: Date;
  expiresAt: Date;
}