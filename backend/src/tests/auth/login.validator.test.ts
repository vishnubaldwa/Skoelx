import { loginSchema } from "../../modules/auth/validators/login.validator.js";

const valid = loginSchema.safeParse({
  email: "admin@skoelx.com",
  password: "Admin@123"
});

console.log("VALID");

console.log(valid.success);

const invalid = loginSchema.safeParse({
  email: "abc",
  password: "123"
});

console.log("INVALID");

console.log(invalid.success);

if (!invalid.success) {
  console.log(invalid.error.flatten().fieldErrors);
}