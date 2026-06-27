import { License, LicenseStatus } from "@prisma/client";

import { CreateLicenseDto } from "../dto/create-license.dto.js";

import BaseRepository from "../../../common/repositories/base.repository.js";

export default class LicenseRepository extends BaseRepository {
  constructor() {
    super();
  }
  async create(
    data: CreateLicenseDto & {
      licenseKey: string;
    }
  ): Promise<License> {
    return this.prisma.license.create({
      data: {
        licenseKey: data.licenseKey,
        customerId: data.customerId,
        productId: data.productId,
        planId: data.planId,
        issuedAt: new Date(),
        expiresAt: data.expiresAt,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.license.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        product: true,
        plan: true,
        devices: true,
        validations: true,
      },
    });
  }

  async findByLicenseKey(licenseKey: string) {
    return this.prisma.license.findUnique({
      where: {
        licenseKey,
      },
      include: {
        customer: true,
        product: true,
        plan: true,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const [licenses, total] = await this.prisma.$transaction([
      this.prisma.license.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          customer: true,
          product: true,
          plan: true,
        },
      }),

      this.prisma.license.count(),
    ]);

    return {
      data: licenses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateStatus(
    id: string,
    status: LicenseStatus
  ) {
    return this.prisma.license.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async renew(
    id: string,
    expiresAt: Date
  ) {
    return this.prisma.license.update({
      where: {
        id,
      },
      data: {
        expiresAt,
        status: LicenseStatus.ACTIVE,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.license.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return this.prisma.license.count();
  }
}