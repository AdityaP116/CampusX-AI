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

  // 1. Reverse proxy trust (Render, Cloud Run, AWS ALB, NGINX)
  app.set("trust proxy", 1);

  // 2. HTTP Security Headers (Strict-Transport-Security, X-Content-Type-Options, etc.)
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // 3. Strict HTTPS Enforcement in Production
  if (env.NODE_ENV === "production") {
    app.use((req: Request, res: Response, next) => {
      const isHttps = req.secure || req.headers["x-forwarded-proto"] === "https";
      if (!isHttps) {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
      }
      next();
    });
  }

  // 4. CORS Whitelisting
  const allowedOrigins = env.CORS_ORIGIN.includes(",")
    ? env.CORS_ORIGIN.split(",").map((o) => o.trim())
    : env.CORS_ORIGIN;

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  // Chrome DevTools Probe Handler
  app.get("/.well-known/appspecific/com.chrome.devtools.json", (_req: Request, res: Response) => {
    res.status(204).end();
  });

  // Root Welcome Endpoint
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json(
      ApiResponse.success("Welcome to CampusX Backend API Server", {
        version: "v1",
        docs: "/docs",
        health: "/health",
        status: "UP",
      })
    );
  });

  // 5. Global Rate Limiter & Audit Logger
  app.use(globalRateLimiter);
  app.use(requestLogger);

  // 6. Body Parsing with Safe Payload Size Quotas
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: true, limit: "100kb" }));

  // Swagger API Documentation
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 7. Protected & Validated API Routes
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

  // 404 Unhandled Route Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json(
      ApiResponse.error(`Route ${req.method} ${req.originalUrl} not found`, null)
    );
  });

  // Global Error Handler (Must be registered last)
  app.use(globalErrorHandler);

  return app;
};
