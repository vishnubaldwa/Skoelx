export interface CreateLicenseDto {
  customerId: string;
  productId: string;
  planId?: string;
  expiresAt: Date;
}