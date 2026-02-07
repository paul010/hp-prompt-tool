import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HP AI Learning Academy - AI 提示词库",
  description: "HP AI Learning Academy 打造的一站式 AI 提示词库，以「安全、实用、有目的」为理念，重点推广 Microsoft Copilot 工具生态，助力 HP 员工掌握前沿生产力工具。",
  keywords: ["HP", "AI", "Copilot", "提示词", "Learning Academy", "Microsoft 365", "AI Summit 2026"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
