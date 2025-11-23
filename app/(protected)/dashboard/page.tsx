"use client";

import { Tracks } from "@/src/features/home/components/tracks/Tracks";
import { AuthGuard } from "../../../src/features/autentication/components/AuthGuard";

import Header from "@/src/features/home/components/header/Header";
import { useAccount, useEnsName } from "wagmi";
import LoadingPoky from "@/src/shared/components/LoadingPoky";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data: ensName, isLoading, isError } = useEnsName({ address });
  if (!isConnected) {
    return <div>Please connect your wallet to view the dashboard.</div>;
  }
  if (isLoading) {
    return <LoadingPoky loading={isLoading} />;
  }
  if (isError) {
    return <div>Error loading ENS name.</div>;
  }
  console.log("Address:", address);
  console.log("ENS name:", ensName);

  if (ensName) {
    console.log("ENS name:", ensName);
  }

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header />
      <Tracks />
    </AuthGuard>
  );
}
