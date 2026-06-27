import { License } from "@prisma/client";

import AppError from "../../../errors/AppError.js";

import LicenseRepository from "../repositories/license.repository.js";
import LicenseKeyGenerator from "../utils/license-key.generator.js";

import { CreateLicenseDto } from "../dto/create-license.dto.js";
import { UpdateLicenseDto } from "../dto/update-license.dto.js";

import prisma from "../../../config/database.js";

export default class LicenseService {
  private readonly repository = new LicenseRepository();

  async generate(data: CreateLicenseDto): Promise<License> {
    const customer = await prisma.customer.findUnique({
      where: {
        id: data.customerId,
      },
    });

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    const product = await prisma.product.findUnique({
      where: {
        id: data.productId,
      },
    });

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    if (data.planId) {
      const plan = await prisma.licensePlan.findUnique({
        where: {
          id: data.planId,
        },
      });

      if (!plan) {
        throw new AppError("License plan not found.", 404);
      }
    }

    const licenseKey = LicenseKeyGenerator.generate(
      product.code,
      customer.customerCode
    );

    return this.repository.create({
      ...data,
      licenseKey,
    });
  }

  async findById(id: string) {
    const license = await this.repository.findById(id);

    if (!license) {
      throw new AppError("License not found.", 404);
    }

    return license;
  }

  async findByLicenseKey(key: string) {
    return this.repository.findByLicenseKey(key);
  }

  async findAll(page = 1, limit = 10) {
    return this.repository.findAll(page, limit);
  }

  async renew(
    id: string,
    expiresAt: Date
  ) {
    return this.repository.renew(id, expiresAt);
  }

  async suspend(id: string) {
    return this.repository.updateStatus(
      id,
      "SUSPENDED"
    );
  }

  async revoke(id: string) {
    return this.repository.updateStatus(
      id,
      "REVOKED"
    );
  }

  async activate(id: string) {
    return this.repository.updateStatus(
      id,
      "ACTIVE"
    );
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async count() {
    return this.repository.count();
  }
}