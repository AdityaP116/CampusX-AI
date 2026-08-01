import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { createApp } from "./app";
import { env } from "./config/env.config";
import { logger } from "./utils/logger";

const app = createApp();
const server = http.createServer(app);

// Socket.IO Server Initialization
export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = env.PORT || 5000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  logger.info(`🚀 CampusX Backend running on http://${HOST}:${PORT} [${env.NODE_ENV}]`);
});

// Graceful Shutdown
const shutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info("HTTP server closed.");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
