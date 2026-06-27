import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Skoelx...");

  const superAdminRole = await prisma.role.upsert({
    where: {
      name: "Super Admin",
    },
    update: {},
    create: {
      name: "Super Admin",
      description: "Full system access",
    },
  });

  const password = await bcrypt.hash("Admin@123", 12);

  await prisma.user.upsert({
    where: {
      email: "admin@skoelx.com",
    },
    update: {},
    create: {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@skoelx.com",
      password,
      roles: {
        create: {
          roleId: superAdminRole.id,
        },
      },
    },
  });

  console.log("✅ Super Admin created");
  console.log("Email    : admin@skoelx.com");
  console.log("Password : Admin@123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });