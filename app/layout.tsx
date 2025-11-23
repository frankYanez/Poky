import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { ReactNode } from "react";
import "@/src/core/styles/global.css";
import ColorBends from "@/src/landing/components/ColorBends/ColorBends";
import Footer from "@/src/features/landing/components/Footer/Footer";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { configWagmi } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poky",
  description: "Your Web3 Wallet Experience",
};

function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <ColorBends
        style={{ position: "fixed", inset: 0, zIndex: 1 }}
        className="fixed inset-0 -z-10 opacity-10"
        transparent={true}
      />
      <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_50%_-20%,#000_0%,#000_55%,#000_100%)]" />

      {/* Soft ambient glows */}
      <div
        className="absolute inset-0 opacity-[0.35] blur-[80px] mix-blend-screen
        bg-[radial-gradient(circle_at_60%_65%,rgba(0,195,255,0.35),transparent_55%)]"
      />

      <div
        className="absolute inset-0 opacity-[0.28] blur-[90px] mix-blend-screen
        bg-[radial-gradient(circle_at_35%_80%,rgba(255,112,196,0.25),transparent_60%)]"
      />

      {/* Multi-spot color atmosphere */}
      <div className="absolute inset-0 blur-2xl opacity-[0.45] mix-blend-soft-light bg-radial-multi" />

      {/* Subtle conic glow */}
      <div className="absolute inset-0 blur-[140px] opacity-[0.35] mix-blend-overlay bg-conic-soft" />

      {/* Fine texture highlights */}
      <div
        className="absolute inset-0 opacity-[0.25] mix-blend-screen
        bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_20%)]"
      />

      {/* Bottom-enhanced depth */}
      <div
        className="absolute inset-0 opacity-[0.4] blur-xl
        bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.65)_100%)]"
      />
    </div>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const responseHeaders = headers();
  const initialState = cookieToInitialState(configWagmi);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppBackground />
        <Providers initialState={initialState}>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
