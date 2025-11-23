import { createConfig, createStorage, cookieStorage } from 'wagmi'

import { wagmiChains, wagmiTransports } from '@/chains/chains'

export const wagmiConfigParameters = {
  chains: wagmiChains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: wagmiTransports,
} as const

export const configWagmi = createConfig(wagmiConfigParameters)
