import authRepository from "../repositories/auth.repository.js";
import { verifyPassword } from "../../../utils/hash.js";
import { generateAccessToken } from "../../../utils/jwt.js";
import type { LoginDto } from "../validators/login.validator.js";

class AuthService {
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
      throw new Error("User account is not active.");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = crypto.randomUUID();

    await authRepository.saveRefreshToken(
      user.id,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    );

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
      },

      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export default new AuthService();