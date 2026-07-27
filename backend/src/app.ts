import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.config";
import { requestLogger } from "./middlewares/request-logger.middleware";
import { globalRateLimiter } from "./middlewares/rate-limiter.middleware";
import { globalErrorHandler } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs";
import apiRoutes from "./routes";
import { ApiResponse } from "./utils/response.util";

export const createApp = (): Application => {
  const app: Application = express();

  // Security Middlewares
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // Request Rate Limiter & Logger
  app.use(globalRateLimiter);
  app.use(requestLogger);

  // Body Parsing Middlewares
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Swagger API Documentation
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API Routes
  app.use("/api/v1", apiRoutes);

  // Health Check Endpoint
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json(
      ApiResponse.success("CampusX API is healthy", {
        status: "UP",
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
      })
    );
  });

  // Global Error Handler (Must be registered last)
  app.use(globalErrorHandler);

  return app;
};
