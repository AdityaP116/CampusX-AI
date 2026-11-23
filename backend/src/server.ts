import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { createApp } from "./app";
import { env } from "./config/env.config";
import { auth } from "./config/firebase.config";
import { logger } from "./utils/logger";
import { ChatService } from "./services";
import * as admin from "firebase-admin";

export interface AuthenticatedSocket extends Socket {
  user?: admin.auth.DecodedIdToken;
}

export interface ClientToServerEvents {
  join_conversation: (conversationId: string) => void;
  leave_conversation: (conversationId: string) => void;
}

export interface ServerToClientEvents {
  new_message: (message: unknown) => void;
  error_message: (error: { message: string }) => void;
}

const app = createApp();
const server = http.createServer(app);

const allowedOrigins = env.CORS_ORIGIN.includes(",")
  ? env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : env.CORS_ORIGIN;

// Socket.IO Server Initialization with typed events
export const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

// Socket.IO Authentication Middleware
io.use(async (socket: AuthenticatedSocket, next) => {
  const token =
    socket.handshake.auth?.token ||
    (socket.handshake.headers?.authorization?.startsWith("Bearer ")
      ? socket.handshake.headers.authorization.split("Bearer ")[1]
      : undefined);

  if (token) {
    try {
      const decoded = await auth.verifyIdToken(token);
      socket.user = decoded;
      return next();
    } catch (err) {
      logger.warn(`Socket.IO token verification failed: ${(err as Error).message}`);
    }
  }
  next();
});

io.on("connection", (socket: AuthenticatedSocket) => {
  logger.info(`Socket connected: ${socket.id} (User: ${socket.user?.uid || "anonymous"})`);

  socket.on("join_conversation", async (conversationId: string) => {
    try {
      const userId = socket.user?.uid;
      if (!userId) {
        socket.emit("error_message", { message: "Authentication required to join conversation" });
        return;
      }

      // Security check: Validate user is an actual participant in this conversation
      const conversation = await ChatService.getConversationById(conversationId);
      if (!conversation || !conversation.participants.includes(userId)) {
        logger.warn(`Unauthorized conversation join attempt: User ${userId} -> Conv ${conversationId}`);
        socket.emit("error_message", { message: "Unauthorized conversation access" });
        return;
      }

      socket.join(`conversation:${conversationId}`);
      logger.info(`User ${userId} joined conversation:${conversationId}`);
    } catch (err) {
      logger.error(`Error joining conversation: ${(err as Error).message}`);
      socket.emit("error_message", { message: "Failed to join conversation" });
    }
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
