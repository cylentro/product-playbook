import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Product Playbook",
  description: "Master the Product Operating Model. A premium, motion-driven learning experience for Product Managers.",
  keywords: ["product management", "PDLC", "learning", "playbook"],
  authors: [{ name: "Christian Hadianto" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Product Playbook",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "The Product Playbook",
    description: "Master the Product Operating Model.",
    siteName: "The Product Playbook",
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

import { SmoothScroll, CommandPalette, KeyboardShortcutsDialog } from "@/components/modules";
import { ServiceWorkerRegistration } from "@/components/pwa";
import { getNavigationData } from "@/lib/markdown";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navData = await getNavigationData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ServiceWorkerRegistration />
        <CommandPalette initialData={navData} />
        <KeyboardShortcutsDialog />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

