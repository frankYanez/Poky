"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ParaModal,
  useAccount,
  AuthLayout,
  ExternalWallet,
} from "@getpara/react-sdk";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const APP_NAME = "Poky";
const APP_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8fz0FbCLDQrje0spqOLkm2ZXKkBCfymsVWA&s";

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const account = useAccount();
  const queryClient = useQueryClient();
  const hasRedirected = useRef(false);
  const wasOpen = useRef(false);

  const isAuthenticated = account.data?.isConnected === true;

  useEffect(() => {
    if (wasOpen.current && isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      setIsOpen(false);
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      hasRedirected.current = false;
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: ["PARA_ACCOUNT"] });
  }, [queryClient]);

  const handleOpen = useCallback(() => {
    hasRedirected.current = false;
    wasOpen.current = false;
    setIsOpen(true);
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Sign in with Para
      </button>
      <ParaModal
        appName={APP_NAME}
        logo={APP_LOGO}
        isOpen={isOpen}
        onClose={handleClose}
        oAuthMethods={[]}
        authLayout={[AuthLayout.AUTH_FULL, AuthLayout.EXTERNAL_FULL]}
        externalWallets={[ExternalWallet.METAMASK, ExternalWallet.WALLETCONNECT]}
        recoverySecretStepEnabled={true}
        onRampTestMode={true}
        disableEmailLogin={false}
        disablePhoneLogin={false}
      />
    </>
  );
}


