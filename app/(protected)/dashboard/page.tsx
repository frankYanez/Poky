"use client";

import { Tracks } from "@/src/features/home/components/tracks/Tracks";
import { AuthGuard } from "../../../src/features/autentication/components/AuthGuard";

import Header from "@/src/features/home/components/header/Header";

export default function DashboardPage() {

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header/>
      <Tracks />
    </AuthGuard>
  );
}
