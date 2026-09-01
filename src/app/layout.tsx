import type { Metadata } from "next";
import { Manrope, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SmoothScrolling } from "@/components/shared/SmoothScrolling";
import { siteUrl, defaultMeta } from "@/lib/constants";

const display = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultMeta.title,
    template: `%s | ${defaultMeta.title}`,
  },
  description: defaultMeta.description,
  applicationName: defaultMeta.title,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}