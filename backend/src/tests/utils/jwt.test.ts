import {
  generateAccessToken,
  verifyAccessToken,
} from "../../utils/jwt.js";

const token = generateAccessToken({
  userId: "admin-id",
  email: "admin@skoelx.com",
});

console.log("TOKEN");
console.log(token);

console.log();

console.log("PAYLOAD");
console.log(verifyAccessToken(token));