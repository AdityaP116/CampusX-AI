import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, Geist } from "next/font/google";
import { Navbar } from "@/shared/components/layout/navbar";
import { FooterWrapper } from "@/shared/components/layout/footer-wrapper";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import Script from "next/script";
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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://campusx-ai.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CampusX | Verified Student-Only Marketplace",
    template: "%s | CampusX",
  },
  description: "A secure, verified campus marketplace to buy, sell, and rent textbooks, electronics, and dorm essentials with trusted university peers.",
  keywords: ["campus marketplace", "student marketplace", "buy college textbooks", "sell college textbooks", "student-to-student marketplace", "dorm essentials"],
  authors: [{ name: "CampusX Core Team" }],
  creator: "CampusX",
  publisher: "CampusX Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CampusX | Verified Student-Only Marketplace",
    description: "Buy, sell, and rent with verified college peers. Zero platform fees, safe on-campus meetups, and university email verification.",
    url: baseUrl,
    siteName: "CampusX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CampusX - Verified Student Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusX | Verified Student-Only Marketplace",
    description: "Verified student marketplace for campus trading.",
    images: ["/og-image.png"],
    creator: "@campusx",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-token",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CampusX",
  "url": baseUrl,
  "logo": `${baseUrl}/logo.png`,
  "sameAs": [
    "https://twitter.com/campusx",
    "https://instagram.com/campusx",
    "https://github.com/campusx-ai"
  ],
  "description": "Safe, verified peer-to-peer marketplace exclusively for university students.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@campusx.market"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${geist.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
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
