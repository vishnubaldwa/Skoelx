import prisma from "../../../config/database.js";

import AppError from "../../../errors/AppError.js";

import FingerprintService, {
  FingerprintPayload,
} from "./fingerprint.service.js";

export default class ValidationService {
  async validate(
    licenseKey: string,
    payload: FingerprintPayload
  ) {
    const license = await prisma.license.findUnique({
      where: {
        licenseKey,
      },
      include: {
        devices: true,
      },
    });

    if (!license) {
      throw new AppError("Invalid license.", 404);
    }

    if (license.status !== "ACTIVE") {
      throw new AppError("License is inactive.", 403);
    }

    if (license.expiresAt < new Date()) {
      throw new AppError("License expired.", 403);
    }

    const fingerprint =
      FingerprintService.generate(payload);

    const device = license.devices.find(
      (d) => d.machineFingerprint === fingerprint
    );

    if (!device) {
      throw new AppError(
        "Device not activated.",
        403
      );
    }

    await prisma.license.update({
      where: {
        id: license.id,
      },
      data: {
        lastValidatedAt: new Date(),
      },
    });

    await prisma.licenseDevice.update({
      where: {
        id: device.id,
      },
      data: {
        lastValidation: new Date(),
      },
    });

    await prisma.licenseValidationLog.create({
      data: {
        licenseId: license.id,
        validatedAt: new Date(),
        result: true,
        message: "Validation successful",
      },
    });

    return {
      valid: true,
      licenseId: license.id,
      expiresAt: license.expiresAt,
      status: license.status,
    };
  }
}