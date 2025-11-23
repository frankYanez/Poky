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
import { anvil } from "viem/chains";

const MODULE_ABI = ModuleRegistry.abi;
const TRACK_ABI = TrackRegistry.abi;
const MODULE_REGISTRY_ADDRESS = "0x3a220f351252089d385b29beca14e27f204c296a";
const TRACK_REGISTRY_ADDRESS = "0xdb7d6ab1f17c6b31909ae466702703daef9269cf";

export default function DashboardPage() {
  const nobelBileteral = "0xfffCc03dB0f7B885437f05e63C1A77131Cfdd3fE";

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

  const {
    data: dataTrack,
    isLoading: isTrackLoading,
    isError: isTrackError,
    status: trackContractStatus,
  } = useReadContract({
    address: TRACK_REGISTRY_ADDRESS,
    abi: TRACK_ABI,
    functionName: "getTracks",
    args: [0, 20], // offset, limit
    chainId: undefined,
    query: { enabled: true },
  });

  const {
    data: dataModule,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    status: contractStatus,
  } = useReadContract({
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
  console.log("Contract read status:", contractStatus);
  console.log("Data Module:", dataModule);
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
      <Header ens={ensName} />
      <Tracks />
    </AuthGuard>
  );
}
