import app from "./app.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";
import "./core/events/index.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info("========================================");
  logger.info(`${env.APP_NAME} Backend Started`);
  logger.info(`Environment : ${env.NODE_ENV}`);
  logger.info(`Server      : ${env.APP_URL}`);
  logger.info(`API         : ${env.APP_URL}/api/v1`);
  logger.info("========================================");
});