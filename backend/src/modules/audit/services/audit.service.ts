import prisma from "../../../config/database.js";

interface AuditLogInput {
  userId?: string;
  module: string;
  action: string;
  referenceId?: string;
  ipAddress?: string;
  requestId?: string;
}

export default class AuditService {
  async log(data: AuditLogInput) {
    return prisma.auditLog.create({
      data: {
        userId: data.userId,
        module: data.module,
        action: data.action,
        referenceId: data.referenceId,
        ipAddress: data.ipAddress,
        requestId: data.requestId,
      },
    });
  }
}