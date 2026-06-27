import { License, LicenseStatus } from "@prisma/client";

import prisma from "../../../config/database.js";

import { CreateLicenseDto } from "../dto/create-license.dto.js";

export default class LicenseRepository {
  async create(
    data: CreateLicenseDto & {
      licenseKey: string;
    }
  ): Promise<License> {
    return prisma.license.create({
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
    return prisma.license.findUnique({
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
    return prisma.license.findUnique({
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
    const [licenses, total] = await prisma.$transaction([
      prisma.license.findMany({
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

      prisma.license.count(),
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
    return prisma.license.update({
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
    return prisma.license.update({
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
    return prisma.license.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.license.count();
  }
}