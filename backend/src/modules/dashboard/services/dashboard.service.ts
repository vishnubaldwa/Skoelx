import prisma from "../../../config/database.js";

export default class DashboardService {
  async getDashboard() {
    const [
      totalProducts,
      totalCustomers,
      totalLicenses,
      activeLicenses,
      expiredLicenses,
      suspendedLicenses,
      totalDevices,
      totalUsers,
      recentAudits,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.customer.count(),
      prisma.license.count(),

      prisma.license.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.license.count({
        where: {
          status: "EXPIRED",
        },
      }),

      prisma.license.count({
        where: {
          status: "SUSPENDED",
        },
      }),

      prisma.licenseDevice.count(),

      prisma.user.count(),

      prisma.auditLog.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return {
      overview: {
        totalProducts,
        totalCustomers,
        totalLicenses,
        activeLicenses,
        expiredLicenses,
        suspendedLicenses,
        totalDevices,
        totalUsers,
      },

      recentAudits,
    };
  }
}