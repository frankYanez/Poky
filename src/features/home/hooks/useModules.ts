"use client";

import { useReadContract } from "wagmi";
import ModuleRegistry from "@/contracts/ModuleRegistry.json";

import { useEffect, useState } from "react";

const MODULE_ABI = ModuleRegistry.abi;

export function useModules(moduleIds: bigint[]) {
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    if (!moduleIds || moduleIds.length === 0) {
      setModules([]);
      return;
    }
  }, [moduleIds]);

  const results = moduleIds.map((id) =>
    useReadContract({
      address: MODULE_ABI,
      abi: MODULE_ABI,
      functionName: "getModule",
      args: [id],
      query: { enabled: !!id },
    })
  );

  useEffect(() => {
    const formatted = results
      .map((r, i) => {
        if (!r.data) return null;

        return {
          id: moduleIds[i],
          title: r.data.title ?? "Sin título",
          description: r.data.description ?? "Sin descripción",
          contentCID: r.data.contentCID ?? null,
        };
      })
      .filter(Boolean);

    setModules(formatted);
  }, [results.map((r) => r.data).join("-")]);

  return modules;
}
