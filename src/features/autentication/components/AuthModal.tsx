"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ParaModal,
  useAccount,
  AuthLayout,
  ExternalWallet,
} from "@getpara/react-sdk";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/src/shared/lib/cn/utils";

const APP_NAME = "Poky";
const APP_LOGO =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8fz0FbCLDQrje0spqOLkm2ZXKkBCfymsVWA&s";

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

  const modalContent = (
      
    <div  className={cn(isOpen ? "flex" : "hidden", "backdrop-blur fixed inset-0 z-50  items-center justify-center bg-black/50 p-4")}>
<ParaModal
      appName={APP_NAME}
      logo={APP_LOGO}
      isOpen={isOpen}
      onClose={handleClose}
      oAuthMethods={[]}
      authLayout={[AuthLayout.AUTH_FULL, AuthLayout.EXTERNAL_FULL]}
      externalWallets={[
        ExternalWallet.METAMASK,
        ExternalWallet.WALLETCONNECT,
      ]}
      recoverySecretStepEnabled={true}
      onRampTestMode={true}
      disableEmailLogin={false}
      disablePhoneLogin={false}
    
    />
    </div>
  );
// 533950
  return (
    <>
      <button
        onClick={handleOpen}
        className="
          inline-flex items-center justify-center
          px-6 py-3
          rounded-full
          text-base font-semibold
          text-white
          bg-gradient-to-r from-primary via-accentBlue to-accentPink
          shadow-glow
          backdrop-blur-xl
          border border-white/10
          transition
          hover:scale-[1.02] hover:shadow-glow-primary
          active:scale-[0.98]
        "
      >
        Sign in
      </button>

      {typeof window !== "undefined" &&
        createPortal(modalContent, document.body)}
    </>
  );
}
