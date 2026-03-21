import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CustomCursor from "./components/CustomCursor";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "URC Robotics | Autonomous Cleaning",
  description:
    "Experience intelligent, data-driven autonomous cleaning built specifically for massive commercial and industrial spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable, "font-mono", jetbrainsMono.variable)}>
      <body className="relative min-h-full flex flex-col overflow-x-hidden antialiased">
        <CustomCursor />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
