import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/context/TimerContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study Track - AI-Powered Study Planner",
  description: "Track progress, build streaks, and achieve your academic goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <TimerProvider>
          {children}
        </TimerProvider>
      </body>
    </html>
  );
}
