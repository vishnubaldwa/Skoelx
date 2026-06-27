import { Prisma, Customer } from "@prisma/client";

import prisma from "../../../config/database.js";

import { CreateCustomerDto } from "../dto/create-customer.dto.js";
import { UpdateCustomerDto } from "../dto/update-customer.dto.js";

export default class CustomerRepository {
  async create(data: CreateCustomerDto): Promise<Customer> {
    return prisma.customer.create({
      data,
    });
  }

  async findById(id: string): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        contacts: true,
        domains: true,
      },
    });
  }

  async findByCustomerCode(
    customerCode: string
  ): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: {
        customerCode,
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: Prisma.CustomerStatusFilter
  ) {
    const where: Prisma.CustomerWhereInput = {};

    if (search) {
      where.OR = [
        {
          customerCode: {
            contains: search,
          },
        },
        {
          organizationName: {
            contains: search,
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [customers, total] = await prisma.$transaction([
      prisma.customer.findMany({
        where,
        include: {
          contacts: true,
          domains: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.customer.count({
        where,
      }),
    ]);

    return {
      data: customers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    data: UpdateCustomerDto
  ): Promise<Customer> {
    return prisma.customer.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<Customer> {
    return prisma.customer.delete({
      where: {
        id,
      },
    });
  }

  async existsByCustomerCode(
    customerCode: string
  ): Promise<boolean> {
    const customer = await prisma.customer.findUnique({
      where: {
        customerCode,
      },
      select: {
        id: true,
      },
    });

    return !!customer;
  }

  async count(): Promise<number> {
    return prisma.customer.count();
  }
}