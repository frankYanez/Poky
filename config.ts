import { createConfig, http , createStorage, cookieStorage} from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const configWagmi = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
    storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})