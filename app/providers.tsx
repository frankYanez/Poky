"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParaProvider, Environment, ExternalWallet } from "@getpara/react-sdk";
import {
  ParaEvmProvider,
  metaMaskWallet,
  walletConnectWallet,
} from "@getpara/evm-wallet-connectors";
import "@getpara/react-sdk/styles.css";
import { type State } from "wagmi";
import { wagmiConfigParameters } from "@/config";
import LoadingPoky from "@/src/shared/components/LoadingPoky";

const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY || "";
const PARA_ENV = Environment.BETA;
const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "demo";

export function Providers({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: State | undefined;
}) {
  const [mounted, setMounted] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const invalidateAccount = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["PARA_ACCOUNT"] });
  }, [queryClient]);

  const callbacks = useMemo(
    () => ({
      onLogin: invalidateAccount,
      onLogout: invalidateAccount,
      onAccountSetup: invalidateAccount,
      onAccountCreation: invalidateAccount,
      onWalletsChange: invalidateAccount,
      onExternalWalletChange: invalidateAccount,
    }),
    [invalidateAccount]
  );

  if (!mounted) {
    return <LoadingPoky loading={true} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ParaProvider
        paraClientConfig={{
          env: PARA_ENV,
          apiKey: PARA_API_KEY,
        }}
        externalWalletConfig={{
          wallets: [ExternalWallet.METAMASK, ExternalWallet.WALLETCONNECT],
        }}
        config={{
          appName: "Poky",
        }}
        callbacks={callbacks}
      >
        <ParaEvmProvider
          config={{
            ...wagmiConfigParameters,
            projectId: WALLET_CONNECT_PROJECT_ID,
            appName: "Poky",
            wallets: [metaMaskWallet, walletConnectWallet],
          }}
          initialState={initialState}
        >
          {children}
        </ParaEvmProvider>
      </ParaProvider>
    </QueryClientProvider>
  );
}
