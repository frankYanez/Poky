"use client";

import { useAccount } from "@getpara/react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import LoadingPoky from "@/src/shared/components/LoadingPoky";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth: boolean;
  redirectTo: string;
}

interface WalletData {
  id: string;
  address?: string;
  scheme?: string;
}

export function AuthGuard({ children, requireAuth, redirectTo }: AuthGuardProps) {
  const account = useAccount();
  const router = useRouter();
  const { setAuth, setLoading, isAuthenticated, isLoading } = useAuthStore();
  const hasRedirected = useRef(false);

  // Sync Para state with Zustand
  // React Query v5 uses isPending
  const isQueryLoading = account.isPending;

  useEffect(() => {
    if (isQueryLoading) {
      setLoading(true);
      return;
    }

    const walletsRecord = account.data?.wallets || {};
    const wallets: WalletData[] = Object.values(walletsRecord);
    const authenticated = account.data?.isConnected === true;

    setAuth(
      authenticated,
      wallets.map((w) => ({
        id: w.id,
        address: w.address || "",
        scheme: w.scheme || "",
      }))
    );
  }, [isQueryLoading, account.data?.isConnected, account.data?.wallets, setAuth, setLoading]);

  // Handle redirects
  useEffect(() => {
    if (isLoading || hasRedirected.current) return;

    const shouldRedirect =
      (requireAuth && !isAuthenticated) ||
      (!requireAuth && isAuthenticated);

    if (shouldRedirect) {
      hasRedirected.current = true;
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Reset redirect flag when auth state changes
  useEffect(() => {
    hasRedirected.current = false;
  }, [isAuthenticated]);

  // Show loading screen while checking auth or during redirects
  if (isLoading) {
    return <LoadingPoky />;
  }

  if (requireAuth && !isAuthenticated) {
    return <LoadingPoky />;
  }

  if (!requireAuth && isAuthenticated) {
    return <LoadingPoky />;
  }

  return <>{children}</>;
}
