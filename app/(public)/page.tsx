"use client";
import Header from "@/src/features/landing/components/Header";
import { AuthGuard } from "../../src/features/autentication/components/AuthGuard";
import { Hero } from "@/src/features/landing/components/Hero";
import { ProblemSection } from "@/src/features/landing/components/ProblemSection";
import GradientText from "@/src/shared/components/GradientText/GradientText";
import { SolutionSection } from "@/src/features/landing/components/SolutionSection";
import MagicBento from "@/src/features/landing/components/MagicBento/MagicBento";
import ContainerContent from "@/src/shared/components/ContainerContent";

export default function LandingPage() {
  return (
    <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <Header />
      <Hero />
      {/* <LandingPage /> */}
      <ProblemSection />
      <ContainerContent maxWidth="compact">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="mt-60 mb-40 text-center text-6xl py-52 font-semibold"
        >
          Poky - Plataforma de Certificados Educativos Descentralizados
        </GradientText>
      </ContainerContent>
      <MagicBento />

      <SolutionSection />
    </AuthGuard>
  );
}
