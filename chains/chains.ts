import { defineChain } from "viem";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const anvilUrl = "http://0.tcp.sa.ngrok.io:18942";
export const anvilChainId = 31337;

export const anvil = defineChain({
  id: anvilChainId,
  name: "Anvil Local",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [anvilUrl] },
    public: { http: [anvilUrl] },
  },
});

export const supportedChains = [anvil, sepolia] as const;
export const ensChain = mainnet;

export const mainnetRpcUrl =
  process.env.NEXT_PUBLIC_MAINNET_RPC ?? ensChain.rpcUrls.default.http[0];

export const walletTransports = {
  [anvil.id]: http(anvilUrl),
  [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
} as const;

export const wagmiTransports = {
  ...walletTransports,
  [ensChain.id]: http(mainnetRpcUrl),
} as const;

export const wagmiChains = [...supportedChains, ensChain] as const;
