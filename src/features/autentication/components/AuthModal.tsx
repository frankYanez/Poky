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

      {/* Overlay + Modal */}
      {isOpen && (
        <div
          className="
          fixed inset-0 z-[200]
          flex items-center justify-center
          bg-black/60 backdrop-blur-2xl
          px-4
        "
        >
          <div className="relative">
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
              customStyles={{
                overlay: {
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(22px)",
                  zIndex: 99999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                modalContainer: {
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(0,0,0,0.45)",
                  transform: "scale(0.98)",
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
