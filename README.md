# Poky

Aplicación Web3 wallet construida con Next.js 16 y Para SDK para autenticación y gestión de wallets en múltiples blockchains.

## Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Auth/Wallet**: Para SDK (`@getpara/react-sdk`, `@getpara/evm-wallet-connectors`)
- **State Management**: Zustand (estado local) + TanStack Query (estado servidor)
- **Blockchain**: wagmi + viem para interacciones EVM
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP + Motion

## Requisitos

- Node.js 18+
- npm, yarn, pnpm o bun

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/frankYanez/Poky.git
cd Poky

# Instalar dependencias
npm install
```

## Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_PARA_API_KEY=tu_api_key_de_para
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=tu_project_id_de_walletconnect
```

## Scripts

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar ESLint
```

## Estructura del Proyecto

```
app/
├── (public)/           # Rutas públicas (landing page)
├── (protected)/        # Rutas protegidas (dashboard)
├── providers.tsx       # Providers raíz (Para, Query, EVM)
└── layout.tsx          # Layout raíz

src/
├── core/               # Estilos globales
├── features/           # Módulos de features
│   ├── autentication/  # Autenticación
│   │   ├── components/ # AuthGuard, AuthModal
│   │   └── store/      # Zustand auth store
│   ├── home/           # Componentes del dashboard
│   └── landing/        # Componentes de landing
└── shared/             # Componentes y utilidades compartidas
```

## Arquitectura

### Jerarquía de Providers

```
QueryClientProvider → ParaProvider → ParaEvmProvider → App
```

### Flujo de Autenticación

1. `ParaProvider` gestiona la conexión con Para SDK
2. `AuthModal` lanza el modal de Para para login (email, teléfono, wallets externas)
3. `AuthGuard` sincroniza el estado de Para con Zustand y protege rutas
4. `useAuthStore` provee el estado de autenticación a toda la app

### Wallets Soportadas

- MetaMask
- WalletConnect

### Chains Soportadas

- Ethereum Mainnet
- Sepolia (testnet)
- Polygon
- Arbitrum
- Base
- Optimism

## Licencia

MIT
