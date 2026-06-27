import { createRequire } from "node:module";

import logger from "../config/logger.js";

const require = createRequire(import.meta.url);
const pinoHttp = require("pino-http");

export const loggerMiddleware = pinoHttp({
  logger,
});