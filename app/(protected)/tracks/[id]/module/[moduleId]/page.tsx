"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, Trophy } from "lucide-react";
import { AuthGuard } from "@/src/features/autentication/components/AuthGuard";
import Header from "@/src/features/home/components/header/Header";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { InfoStep } from "@/src/features/module/components/InfoStep";
import { SelectionStep } from "@/src/features/module/components/SelectionStep";
import { useModuleProgressStore } from "@/src/features/module/store/moduleProgressStore";
import { getModuleContent } from "@/src/features/module/data/moduleLoader";
import type { Subsection, ModuleContent } from "@/src/features/module/types/moduleContent";
import { cn } from "@/src/shared/lib/cn/utils";

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const trackId = params.id as string;
  const moduleId = params.moduleId as string;

  const [content, setContent] = useState<ModuleContent | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const {
    currentSectionIndex,
    currentStepIndex,
    initModule,
    nextStep,
    prevStep,
    recordAnswer,
    completeModule,
    getProgress,
    getCurrentGlobalIndex,
    getTotalSteps,
    isStepCompleted,
  } = useModuleProgressStore();

  // Cargar contenido del módulo
  useEffect(() => {
    const moduleContent = getModuleContent(moduleId);
    if (moduleContent) {
      setContent(moduleContent);
      initModule(moduleId);
    }
  }, [moduleId, initModule]);

  if (!content) {
    return (
      <AuthGuard requireAuth={true} redirectTo="/">
        <Header />
        <ContainerSection padding="md" minHeight="screen">
          <ContainerContent maxWidth="compact" className="flex items-center justify-center">
            <p className="text-dark-300">Cargando módulo...</p>
          </ContainerContent>
        </ContainerSection>
      </AuthGuard>
    );
  }

  const currentSection = content.sections[currentSectionIndex];
  const currentSubsection = currentSection?.subsections[currentStepIndex];
  const progress = getProgress(content);
  const globalIndex = getCurrentGlobalIndex(content);
  const totalSteps = getTotalSteps(content);

  const handleContinue = () => {
    const hasNext = nextStep(content);
    if (!hasNext) {
      completeModule();
      setIsCompleted(true);
    }
  };

  const handleAnswer = (selectedIndexes: number[], isCorrect: boolean) => {
    recordAnswer({
      sectionIndex: currentSectionIndex,
      subsectionIndex: currentStepIndex,
      selectedIndexes,
      isCorrect,
      timestamp: Date.now(),
    });
  };

  const handleBack = () => {
    const hasPrev = prevStep(content);
    if (!hasPrev) {
      router.push(`/tracks/${trackId}`);
    }
  };

  const handleFinish = () => {
    router.push(`/tracks/${trackId}`);
  };

  const renderSubsection = (subsection: Subsection) => {
    switch (subsection.type) {
      case "INFO":
        return <InfoStep subsection={subsection} onContinue={handleContinue} />;
      case "SIMPLE_SELECTION":
      case "MULTIPLE_SELECTION":
        return (
          <SelectionStep
            subsection={subsection}
            onAnswer={handleAnswer}
            onContinue={handleContinue}
          />
        );
      default:
        return null;
    }
  };

  // Pantalla de completado
  if (isCompleted) {
    return (
      <AuthGuard requireAuth={true} redirectTo="/">
        <Header />
        <ContainerSection padding="md" minHeight="screen" className="flex items-center">
          <ContainerContent maxWidth="compact">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 to-gold-400/20 rounded-full blur-2xl animate-glow-pulse" />
                <div className="relative glass-card rounded-full p-6">
                  <Trophy className="size-16 text-gold-400" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-dark-100 mb-4">
                ¡Módulo Completado!
              </h1>

              <p className="text-dark-300 mb-8 max-w-md mx-auto">
                Has completado exitosamente el módulo "{content.title}".
                Tu conocimiento está listo para ser verificado on-chain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFinish}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-400 text-white font-bold text-sm uppercase tracking-wider"
                >
                  Volver al Track
                </motion.button>
              </div>
            </motion.div>
          </ContainerContent>
        </ContainerSection>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header />
      <ContainerSection padding="none" minHeight="screen" className="flex flex-col">
        {/* Progress Header */}
        <div className="sticky top-[72px] z-30 bg-dark-900/95 backdrop-blur-xl border-b border-dark-700/50">
          <ContainerContent maxWidth="compact" className="py-4">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-dark-300 hover:text-dark-100 transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span className="text-sm font-medium">Atrás</span>
              </button>

              <div className="text-sm text-dark-400">
                <span className="text-violet-400 font-semibold">{globalIndex + 1}</span>
                <span> / {totalSteps}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
                initial={{ width: 0 }}
                animate={{ width: `${((globalIndex + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Section indicator */}
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-dark-400">
                Sección {currentSectionIndex + 1}: {currentSection.title}
              </p>
              <p className="text-xs text-dark-400">{progress}% completado</p>
            </div>
          </ContainerContent>
        </div>

        {/* Section Navigation Pills */}
        <div className="bg-dark-900/50 border-b border-dark-700/30">
          <ContainerContent maxWidth="compact" className="py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {content.sections.map((section, sIndex) => {
                const sectionCompleted = section.subsections.every((_, stepIdx) =>
                  isStepCompleted(sIndex, stepIdx)
                );
                const isCurrent = sIndex === currentSectionIndex;

                return (
                  <div
                    key={sIndex}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all",
                      isCurrent
                        ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                        : sectionCompleted
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-dark-700/30 text-dark-400 border border-dark-600/30"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {sectionCompleted && <CheckCircle2 className="size-3" />}
                      <span>{section.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ContainerContent>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ContainerContent maxWidth="compact" className="h-full py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSectionIndex}-${currentStepIndex}`}
                className="h-full"
              >
                {currentSubsection && renderSubsection(currentSubsection)}
              </motion.div>
            </AnimatePresence>
          </ContainerContent>
        </div>
      </ContainerSection>
    </AuthGuard>
  );
}
