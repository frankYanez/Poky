import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@getpara/web-sdk",
    "@getpara/react-sdk",
    "@getpara/evm-wallet-connectors",
  ],
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
  ],
};

export default nextConfig;
