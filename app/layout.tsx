import type { Metadata, Viewport } from "next";
import { SEARCH_RESULT_ICON_SRC } from "./lib/brand";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "URC Robotics | Autonomous Cleaning",
  description:
    "Experience intelligent, data-driven autonomous cleaning built specifically for massive commercial and industrial spaces.",
  icons: {
    icon: [{ url: SEARCH_RESULT_ICON_SRC, type: "image/png" }],
    apple: SEARCH_RESULT_ICON_SRC,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, "font-mono", jetbrainsMono.variable)}>
      <body className="relative min-h-full flex flex-col overflow-x-hidden antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
