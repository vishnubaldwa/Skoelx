import express, { Application } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";

import router from "./routes/index.js";

import { requestIdMiddleware } from "./middlewares/request-id.middleware.js";
import { notFoundMiddleware } from "./middlewares/notFound.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app: Application = express();

app.disable("x-powered-by");

app.use(requestIdMiddleware);

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    application: env.APP_NAME,
    version: "1.0.0",
  });
});

app.use("/api/v1", router);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;