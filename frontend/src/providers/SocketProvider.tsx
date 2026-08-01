"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useCurrentUser } from "@/store/auth.store";
import { useNotificationsStore, Notification } from "@/store/notifications.store";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    // Only connect if user is authenticated
    if (!currentUser?.id) {
      if (socket) {
        socket.disconnect();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const rawUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const SOCKET_URL = rawUrl.replace(/\/api\/v1\/?$/, "");
    
    const socketInstance = io(SOCKET_URL, {
      auth: {
        userId: currentUser.uid, // This ID will be used by the backend to verify the user
      },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    socketInstance.on("new_notification", (notification: Notification) => {
      useNotificationsStore.getState().addNotification(notification);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off("new_notification");
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
