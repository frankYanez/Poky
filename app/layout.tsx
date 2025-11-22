import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poky UI",
  description: "Glass pastel UI with radial gradients",
};

function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-5%,#b07cf_0%,#1b1238_48%,#0a0f21_76%,#070b15_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_60%_65%,rgba(0,195,255,0.18),transparent_60%),radial-gradient(90%_70%_at_40%_90%,rgba(255,112,196,0.12),transparent_55%)] blur-[2px] opacity-90" />
      <div className="absolute inset-0 opacity-50 mix-blend-screen bg-radial-multi blur-xl" />
      <div className="absolute inset-0 opacity-70 mix-blend-lighten bg-radial-spot-1 blur-3xl" />
      <div className="absolute inset-0 opacity-60 mix-blend-lighten bg-radial-spot-2 blur-3xl" />
      <div className="absolute inset-0 opacity-45 mix-blend-soft-light bg-conic-soft blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.06),transparent_20%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(160%_100%_at_50%_120%,rgba(0,205,255,0.3),transparent_60%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_65%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AppBackground />
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
