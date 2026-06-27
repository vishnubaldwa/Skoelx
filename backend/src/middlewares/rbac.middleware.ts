import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/ForbiddenError.js";
import prisma from "../config/database.js";

export function authorize(...roles: string[]) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new ForbiddenError("Authentication required.");
      }

      const userRoles = await prisma.userRole.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          role: true,
        },
      });

      const allowed = userRoles.some((userRole) =>
        roles.includes(userRole.role.name)
      );

      if (!allowed) {
        throw new ForbiddenError(
          "You don't have permission to perform this action."
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}