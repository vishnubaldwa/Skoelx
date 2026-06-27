import { User } from "@prisma/client";
import prisma from "../../../config/database.js";

export class AuthRepository {
  /**
   * Find user by email.
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * Find user by id.
   */
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Create user.
   */
  async create(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  /**
   * Update password.
   */
  async updatePassword(
    userId: string,
    password: string
  ): Promise<User> {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  /**
   * Save refresh token.
   */
  async saveRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date
  ) {
    return prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  /**
   * Find refresh token.
   */
  async findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * Revoke refresh token.
   */
  async revokeRefreshToken(token: string) {
    return prisma.refreshToken.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });
  }
}

export default new AuthRepository();