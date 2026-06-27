import { hashPassword, verifyPassword } from "../../utils/hash.js";

async function main() {
  const password = "Admin@123";

  const hash = await hashPassword(password);

  console.log("Hash:");
  console.log(hash);

  const valid = await verifyPassword(password, hash);

  console.log("Password Match:", valid);
}

main();