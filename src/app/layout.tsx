import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PM-AI Learning Nexus",
  description: "A motion-driven educational platform for Product Managers to master the Product Development Lifecycle and AI integration.",
  keywords: ["product management", "PDLC", "AI", "learning", "education"],
  authors: [{ name: "PM-AI Learning Nexus" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PM-AI Nexus",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "PM-AI Learning Nexus",
    description: "Master Product Management through Motion-Driven Learning",
    siteName: "PM-AI Learning Nexus",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
