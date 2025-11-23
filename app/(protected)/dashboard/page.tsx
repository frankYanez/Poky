"use client";

import { Tracks } from "@/src/features/home/components/tracks/Tracks";
import { AuthGuard } from "../../../src/features/autentication/components/AuthGuard";

import Header from "@/src/features/home/components/header/Header";
import { useAccount, useEnsName, useReadContract } from "wagmi";
import LoadingPoky from "@/src/shared/components/LoadingPoky";
import { ensChain } from "@/chains/chains";

import ModuleRegistry from "@/contracts/ModuleRegistry.json";
import TrackRegistry from "@/contracts/TrackRegistry.json";
import { AuthModal } from "@/src/features/autentication/components/AuthModal";

export const MODULE_ABI = ModuleRegistry.abi;
export const TRACK_ABI = TrackRegistry.abi;
export const MODULE_REGISTRY_ADDRESS = "0x3a220f351252089d385b29beca14e27f204c296a";
export const TRACK_REGISTRY_ADDRESS = "0xdb7d6ab1f17c6b31909ae466702703daef9269cf";

export type RemoteTrack = {
  id: number | string | bigint;
  title?: string;
  author?: string;
  moduleIds?: Array<number | string | bigint>;
  createdAt?: number | string | bigint;
};
export default function DashboardPage() {
  const { address, isConnected, status } = useAccount();
  const {
    data: ensName,
    isLoading,
    isError,
  } = useEnsName({
    address,
    chainId: ensChain.id,
    query: { enabled: !!address },
  });

  const { data: dataTrack } = useReadContract({
    address: TRACK_REGISTRY_ADDRESS,
    abi: TRACK_ABI,
    functionName: "getTracks",
    args: [0, 20], // offset, limit
    chainId: undefined,
    query: { enabled: true },
  });

  const { data: dataUniqueModules } = useReadContract({
    address: MODULE_REGISTRY_ADDRESS,
    abi: MODULE_ABI,
    functionName: "getModule",
    args: [0n], // moduleId
    chainId: undefined,
    query: { enabled: true },
  });

    const { data: totalModules } = useReadContract({
    address: MODULE_REGISTRY_ADDRESS,
    abi: MODULE_ABI,
    functionName: "totalModules",
    chainId: undefined,
    query: { enabled: true },
  });

  const { data: dataModule } = useReadContract({
    address: MODULE_REGISTRY_ADDRESS,
    abi: MODULE_ABI,
    functionName: "getModules",
    args: [0, 20], // offset, limit
    chainId: undefined,
    query: { enabled: true },
  });

  console.log("ENS NAME:", ensName);
  console.log("Track data:", dataTrack);
  console.log("Account status:", status);
  console.log("Data Unique Modules:", dataUniqueModules);
  console.log("Data Module:", dataModule);
  console.log("Total Modules:", totalModules);
  console.log("Registry Address:", MODULE_REGISTRY_ADDRESS);
  if (!isConnected) {
    return (
      <div className="h-screen">
        <AuthModal />
      </div>
    );
  }
  if (isLoading) {
    return <LoadingPoky loading={isLoading} />;
  }
  if (isError) {
    return <div>Error loading ENS name.</div>;
  }

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header ens={"mddjd"} />
      {Array.isArray(dataTrack) ? (
        <Tracks items={dataTrack as RemoteTrack[]} modules={dataModule} />
      ) : (
        <Tracks items={[]} />
      )}
    </AuthGuard>
  );
}
