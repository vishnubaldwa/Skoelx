import crypto from "crypto";

export interface FingerprintPayload {
  hostname: string;
  macAddress: string;
  cpu: string;
  os: string;
  diskSerial: string;
}

export default class FingerprintService {
  static generate(payload: FingerprintPayload): string {
    const raw = [
      payload.hostname,
      payload.macAddress,
      payload.cpu,
      payload.os,
      payload.diskSerial,
    ].join("|");

    return crypto
      .createHash("sha256")
      .update(raw)
      .digest("hex");
  }

  static compare(
    storedFingerprint: string,
    payload: FingerprintPayload
  ): boolean {
    return (
      storedFingerprint ===
      FingerprintService.generate(payload)
    );
  }
}