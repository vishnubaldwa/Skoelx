import crypto from "crypto";

import prisma from "../../../config/database.js";

import AppError from "../../../errors/AppError.js";

export default class ApiKeyService {
  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  generateSecret() {
    return crypto.randomBytes(64).toString("hex");
  }

  hashSecret(secret: string) {
    return crypto
      .createHash("sha256")
      .update(secret)
      .digest("hex");
  }

  async create(name: string, expiresAt?: Date) {
    const apiKey = this.generateKey();

    const secret = this.generateSecret();

    const secretHash = this.hashSecret(secret);

    const record = await prisma.apiKey.create({
      data: {
        name,
        apiKey,
        secretHash,
        expiresAt,
      },
    });

    return {
      ...record,
      secret,
    };
  }

  async findByApiKey(apiKey: string) {
    return prisma.apiKey.findUnique({
      where: {
        apiKey,
      },
    });
  }

  async validate(
    apiKey: string,
    secret: string
  ) {
    const record =
      await this.findByApiKey(apiKey);

    if (!record) {
      throw new AppError(
        "Invalid API Key",
        401
      );
    }

    if (!record.active) {
      throw new AppError(
        "API Key disabled",
        401
      );
    }

    if (
      record.expiresAt &&
      record.expiresAt < new Date()
    ) {
      throw new AppError(
        "API Key expired",
        401
      );
    }

    const hash = this.hashSecret(secret);

    if (hash !== record.secretHash) {
      throw new AppError(
        "Invalid API Secret",
        401
      );
    }

    await prisma.apiKey.update({
      where: {
        id: record.id,
      },
      data: {
        lastUsedAt: new Date(),
      },
    });

    return record;
  }
}