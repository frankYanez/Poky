"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParaProvider, Environment, ExternalWallet } from "@getpara/react-sdk";
import {
  ParaEvmProvider,
  metaMaskWallet,
  walletConnectWallet,
} from "@getpara/evm-wallet-connectors";
import {
  mainnet,
  sepolia,
  polygon,
  arbitrum,
  base,
  optimism,
} from "wagmi/chains";
import { http } from "viem";
import "@getpara/react-sdk/styles.css";
import { State, WagmiProvider } from "wagmi";
import { configWagmi } from "@/config";
import LoadingPoky from "@/src/shared/components/LoadingPoky";

const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY || "";
const PARA_ENV = Environment.BETA;
const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "demo";

const chains = [mainnet, sepolia, polygon, arbitrum, base, optimism] as const;

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
    <WagmiProvider config={configWagmi} initialState={initialState}>
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
              projectId: WALLET_CONNECT_PROJECT_ID,
              appName: "Poky",
              chains: chains,
              wallets: [metaMaskWallet, walletConnectWallet],
              transports: {
                [mainnet.id]: http(),
                [sepolia.id]: http(),
                [polygon.id]: http(),
                [arbitrum.id]: http(),
                [base.id]: http(),
                [optimism.id]: http(),
              },
            }}
          >
            {children}
          </ParaEvmProvider>
        </ParaProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
