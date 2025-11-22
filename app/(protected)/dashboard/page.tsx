"use client";

import { useLogout } from "@getpara/react-sdk";
import { AuthGuard } from "../../../src/features/autentication/components/AuthGuard";
import { useAuthStore } from "../../../src/features/autentication/store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { wallets, logout: clearAuth } = useAuthStore();
  const { logoutAsync } = useLogout();
  const router = useRouter();

  const primaryWallet = wallets[0];

  const handleLogout = async () => {
    try {
      await logoutAsync();
      clearAuth();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "6px",
            }}
          >
            Logout
          </button>
        </header>

        <section
          style={{
            backgroundColor: "#f5f5f5",
            padding: "24px",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Your Wallet</h2>
          {primaryWallet && (
            <div>
              <p>
                <strong>Address:</strong>{" "}
                <code style={{ wordBreak: "break-all" }}>
                  {primaryWallet.address}
                </code>
              </p>
              <p>
                <strong>Type:</strong> {primaryWallet.scheme}
              </p>
            </div>
          )}
        </section>
      </div>
    </AuthGuard>
  );
}
