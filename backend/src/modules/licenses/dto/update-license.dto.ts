import { LicenseStatus } from "@prisma/client";

export interface UpdateLicenseDto {
  expiresAt?: Date;
  status?: LicenseStatus;
}