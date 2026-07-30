import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { SocketProvider } from "@/providers/SocketProvider";

// =========================================================
// Inter font — CampusX design system specifies Inter exclusively
// =========================================================
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CampusX | The Premium Student Marketplace",
    template: "%s | CampusX",
  },
  description:
    "A secure, high-end ecosystem for verified student-to-student trading. Buy, sell, rent, and exchange within your verified university community.",
  keywords: [
    "student marketplace",
    "campus trading",
    "buy sell campus",
    "student exchange",
    "verified student marketplace",
    "university marketplace",
  ],
  authors: [{ name: "CampusX" }],
  creator: "CampusX",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "CampusX | The Premium Student Marketplace",
    description:
      "Buy, sell, rent, and exchange within your verified university community.",
    siteName: "CampusX",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusX | The Premium Student Marketplace",
    description:
      "Buy, sell, rent, and exchange within your verified university community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#3525cd",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-on-background font-sans antialiased overflow-x-hidden">
        <QueryProvider>
          <AuthProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
