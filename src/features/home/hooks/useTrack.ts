"use client";

import { useMemo } from "react";
import { useContractRead, useContractReads } from "wagmi";
import TrackRegistry from "@/contracts/TrackRegistry.json";
import ModuleRegistry from "@/contracts/ModuleRegistry.json";

const TRACK_REGISTRY_ADDRESS = "0xdb7d6ab1f17c6b31909ae466702703daef9269cf";
const MODULE_REGISTRY_ADDRESS = "0x3a220f351252089d385b29beca14e27f204c296a";

export type RemoteTrack = {
  id: bigint | number | string;
  title?: string;
  author?: string;
  moduleIds?: bigint[];
  createdAt?: bigint | number | string;
};

export function useTrack(trackId?: number | string | null) {
  const idNum = trackId == null ? undefined : Number(trackId);
  const idBig = idNum == null || Number.isNaN(idNum) ? undefined : BigInt(idNum);

  const { data: track, isLoading: loadingTrack, isError: trackError } = useContractRead({
    address: TRACK_REGISTRY_ADDRESS,
    abi: TrackRegistry.abi as any,
    functionName: "getTrack",
    args: idBig ? [idBig] : undefined,
    enabled: !!idBig,
  });

  // moduleIds usually comes as array of bigints
  const moduleIds: bigint[] = (track?.moduleIds ?? []) as bigint[];

  const calls = useMemo(() => {
    return moduleIds.map((mid) => ({
      address: MODULE_REGISTRY_ADDRESS,
      abi: ModuleRegistry.abi as any,
      functionName: "getModule",
      args: [mid],
    }));
  }, [moduleIds]);

  const { data: modules, isLoading: loadingModules, isError: modulesError } = useContractReads({
    contracts: calls,
    enabled: calls.length > 0,
  });

  const loading = loadingTrack || loadingModules;
  const error = trackError || modulesError;

  return {
    track: track as RemoteTrack | undefined,
    modules: (modules as any[]) || [],
    loading,
    error,
  };
}
