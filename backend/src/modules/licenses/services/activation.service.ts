import prisma from "../../../config/database.js";

import AppError from "../../../errors/AppError.js";

import FingerprintService, {
  FingerprintPayload,
} from "./fingerprint.service.js";

export default class ActivationService {
  async activate(
    licenseId: string,
    payload: FingerprintPayload
  ) {
    const license = await prisma.license.findUnique({
      where: {
        id: licenseId,
      },
      include: {
        devices: true,
      },
    });

    if (!license) {
      throw new AppError("License not found.", 404);
    }

    if (license.status !== "ACTIVE") {
      throw new AppError(
        "License is not active.",
        400
      );
    }

    const fingerprint =
      FingerprintService.generate(payload);

    const existing =
      license.devices.find(
        (device) =>
          device.machineFingerprint === fingerprint
      );

    if (existing) {
      return existing;
    }

    return prisma.licenseDevice.create({
      data: {
        licenseId,
        machineFingerprint: fingerprint,
        deviceName: payload.hostname,
        active: true,
      },
    });
  }
}