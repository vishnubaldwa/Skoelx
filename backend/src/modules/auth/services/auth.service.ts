import authRepository from "../repositories/auth.repository.js";
import { verifyPassword } from "../../../utils/hash.js";
import { generateAccessToken } from "../../../utils/jwt.js";
import { LoginDto } from "../validators/login.validator.js";

export class AuthService {
  async login(payload: LoginDto) {
    const user = await authRepository.findByEmail(payload.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatches = await verifyPassword(
      payload.password,
      user.password
    );

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Your account is not active.");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessToken,
    };
  }
}

export default new AuthService();