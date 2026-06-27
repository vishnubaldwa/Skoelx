import crypto from "crypto";

export default class LicenseKeyGenerator {
  static generate(
    productCode: string,
    customerCode: string
  ): string {
    const year = new Date().getFullYear();

    const random = crypto
      .randomBytes(6)
      .toString("hex")
      .toUpperCase();

    const part1 = random.substring(0, 4);
    const part2 = random.substring(4, 8);
    const part3 = random.substring(8, 12);

    return [
      "SKX",
      productCode.toUpperCase(),
      customerCode.toUpperCase(),
      year,
      part1,
      part2,
      part3,
    ].join("-");
  }
}