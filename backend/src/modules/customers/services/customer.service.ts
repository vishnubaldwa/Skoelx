import { Customer } from "@prisma/client";

import AppError from "../../../errors/AppError.js";

import CustomerRepository from "../repositories/customer.repository.js";

import { CreateCustomerDto } from "../dto/create-customer.dto.js";
import { UpdateCustomerDto } from "../dto/update-customer.dto.js";

export default class CustomerService {
  private readonly repository = new CustomerRepository();

  async create(data: CreateCustomerDto): Promise<Customer> {
    const exists = await this.repository.findByCustomerCode(
      data.customerCode
    );

    if (exists) {
      throw new AppError("Customer code already exists.", 409);
    }

    return this.repository.create(data);
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string,
    status?: "ACTIVE" | "INACTIVE" | "SUSPENDED"
  ) {
    return this.repository.findAll(
    page,
   limit,
   search,
   status
    ? { equals: status }
    : undefined
);
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return customer;
  }

  async update(
    id: string,
    data: UpdateCustomerDto
  ): Promise<Customer> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<Customer> {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found.", 404);
    }

    return this.repository.delete(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}