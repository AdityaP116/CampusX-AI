import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { createApp } from "./app";
import { env } from "./config/env.config";
import { auth } from "./config/firebase.config";
import { logger } from "./utils/logger";

const app = createApp();
const server = http.createServer(app);

const allowedOrigins = env.CORS_ORIGIN.includes(",")
  ? env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : env.CORS_ORIGIN;

// Socket.IO Server Initialization
export const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// Socket.IO Authentication Middleware
io.use(async (socket, next) => {
  const token =
    socket.handshake.auth?.token ||
    (socket.handshake.headers?.authorization?.startsWith("Bearer ")
      ? socket.handshake.headers.authorization.split("Bearer ")[1]
      : undefined);

  if (token) {
    try {
      const decoded = await auth.verifyIdToken(token);
      (socket as any).user = decoded;
      return next();
    } catch (err) {
      logger.warn(`Socket.IO token verification failed: ${(err as Error).message}`);
    }
  }
  next();
});

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("join_conversation", (conversationId: string) => {
    socket.join(`conversation:${conversationId}`);
    logger.info(`Socket ${socket.id} joined conversation:${conversationId}`);
  });

  socket.on("leave_conversation", (conversationId: string) => {
    socket.leave(`conversation:${conversationId}`);
    logger.info(`Socket ${socket.id} left conversation:${conversationId}`);
  });

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
