import prisma from "../../../config/database.js";

export default class SystemSettingService {
  async getAll() {
    return prisma.systemSetting.findMany({
      orderBy: {
        key: "asc",
      },
    });
  }

  async get(key: string) {
    return prisma.systemSetting.findUnique({
      where: {
        key,
      },
    });
  }

  async set(
    key: string,
    value: string,
    description?: string
  ) {
    return prisma.systemSetting.upsert({
      where: {
        key,
      },
      update: {
        value,
        description,
      },
      create: {
        key,
        value,
        description,
      },
    });
  }

  async delete(key: string) {
    return prisma.systemSetting.delete({
      where: {
        key,
      },
    });
  }
}