import { Prisma, Product } from "@prisma/client";
import prisma from "../../../config/database.js";
import {
  CreateProductDto,
} from "../dto/create-product.dto.js";
import {
  UpdateProductDto,
} from "../dto/update-product.dto.js";

export default class ProductRepository {
  async create(data: CreateProductDto): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCode(code: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: {
        code,
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: Prisma.ProductStatusFilter
  ) {
    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        {
          code: {
            contains: search,
          },
        },
        {
          name: {
            contains: search,
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(
    id: string,
    data: UpdateProductDto
  ): Promise<Product> {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async existsByCode(code: string): Promise<boolean> {
    const product = await prisma.product.findUnique({
      where: {
        code,
      },
      select: {
        id: true,
      },
    });

    return !!product;
  }

  async count(): Promise<number> {
    return prisma.product.count();
  }
}