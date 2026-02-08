import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HP FY26 数字学院 - AI 提示词库",
  description: "HP FY26 数字学院 AI 提示词库，以「安全、实用、有目的」为理念，重点推广 Microsoft Copilot 工具生态，助力 HP 员工掌握前沿生产力工具。",
  keywords: ["HP", "FY26", "数字学院", "AI", "Copilot", "提示词", "Microsoft 365", "AI Summit 2026"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
