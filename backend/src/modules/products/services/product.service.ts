import { Product } from "@prisma/client";

import AppError from "../../../errors/AppError.js";

import ProductRepository from "../repositories/product.repository.js";

import { CreateProductDto } from "../dto/create-product.dto.js";
import { UpdateProductDto } from "../dto/update-product.dto.js";

export default class ProductService {
  private readonly repository = new ProductRepository();

  async create(data: CreateProductDto): Promise<Product> {
    const exists = await this.repository.findByCode(data.code);

    if (exists) {
      throw new AppError("Product code already exists.", 409);
    }

    return this.repository.create(data);
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: "ACTIVE" | "INACTIVE" | "DEVELOPMENT" | "RETIRED"
  ) {
    return this.repository.findAll(page, limit, search, status);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    return product;
  }

  async update(
    id: string,
    data: UpdateProductDto
  ): Promise<Product> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    if (data.code && data.code !== product.code) {
      const exists = await this.repository.findByCode(data.code);

      if (exists) {
        throw new AppError("Product code already exists.", 409);
      }
    }

    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<Product> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new AppError("Product not found.", 404);
    }

    return this.repository.delete(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}