"use client";

import { Tracks } from "@/src/features/home/components/tracks/Tracks";
import { AuthGuard } from "../../../src/features/autentication/components/AuthGuard";

import Header from "@/src/features/home/components/header/Header";
import MagicBento from "@/src/features/landing/components/MagicBento/MagicBento";

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header />
      <Tracks />
      <MagicBento />
    </AuthGuard>
  );
}
