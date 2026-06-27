import { PrismaClient } from "@prisma/client";

import prisma from "../../config/database.js";

export default abstract class BaseRepository {
  protected readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  protected transaction() {
    return this.prisma.$transaction.bind(this.prisma);
  }

  protected client() {
    return this.prisma;
  }
}