import { Prisma, Product } from "@prisma/client";
import {
  CreateProductDto,
} from "../dto/create-product.dto.js";
import {
  UpdateProductDto,
} from "../dto/update-product.dto.js";

import BaseRepository from "../../../common/repositories/base.repository.js";

export default class ProductRepository extends BaseRepository {
  constructor() {
    super();
  }
  async create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCode(code: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        code,
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: this.prisma.productStatusFilter
  ) {
    const where: this.prisma.productWhereInput = {};

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

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      this.prisma.product.count({
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
    return this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async existsByCode(code: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
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
    return this.prisma.product.count();
  }
}