import GradientText from "@/components/GradientText/GradientText";
import { Hero } from "@/src/features/landing/components/Hero";
import { ProblemSection } from "@/src/features/landing/components/ProblemSection";
import { SolutionSection } from "@/src/features/landing/components/SolutionSection";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col gap-24">
      <Hero />
      <ProblemSection />
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={10}
        showBorder={false}
        className="text-4xl text-center "
      >
        Protocolo de Validacion de conocimiento
      </GradientText>
      <SolutionSection />
    </main>
  );
}
