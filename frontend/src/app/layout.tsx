import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, Geist } from "next/font/google";
import { Navbar } from "@/shared/components/layout/navbar";
import { FooterWrapper } from "@/shared/components/layout/footer-wrapper";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusX | Premium Student Marketplace",
  description: "A secure, high-end ecosystem for verified student-to-student trading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <FooterWrapper />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
