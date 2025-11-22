"use client";

import { AuthGuard } from "../../src/features/autentication/components/AuthGuard";
import { AuthModal } from "../../src/features/autentication/components/AuthModal";

export default function LandingPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "24px",
        }}
      >
        <h1 style={{ fontSize: "48px", margin: 0 }}>Poky</h1>
        <p style={{ fontSize: "18px", color: "#666", margin: 0 }}>
          Your Web3 Wallet Experience
        </p>
        <AuthModal />
      </div>
    </AuthGuard>
  );
}
