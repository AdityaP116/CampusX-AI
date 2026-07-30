"use client";

// =========================================================
// TanStack Query Provider
// Wraps the app with QueryClientProvider and DevTools
// =========================================================

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Each browser tab gets its own QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute — data considered fresh
            gcTime: 5 * 60 * 1000, // 5 minutes — cache garbage collection
            refetchOnWindowFocus: false, // prevents jarring refetches
            retry: (failureCount, error) => {
              // Don't retry on 401/403 — it won't help
              if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
              ) {
                const status = (error as { response?: { status?: number } })
                  .response?.status;
                if (status === 401 || status === 403 || status === 404) {
                  return false;
                }
              }
              return failureCount < 2;
            },
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  );
}
