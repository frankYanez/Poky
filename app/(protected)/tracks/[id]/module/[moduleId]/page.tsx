"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Trophy } from "lucide-react";
import { AuthGuard } from "@/src/features/autentication/components/AuthGuard";
import Header from "@/src/features/home/components/header/Header";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { InfoStep } from "@/src/features/module/components/InfoStep";
import { SelectionStep } from "@/src/features/module/components/SelectionStep";
import { useModuleProgressStore } from "@/src/features/module/store/moduleProgressStore";
import { useTrackProgressStore } from "@/src/features/track/store/trackProgressStore";
import { getModuleContent } from "@/src/features/module/data/moduleLoader";
import type { Subsection, ModuleContent } from "@/src/features/module/types/moduleContent";

// Por ahora, siempre usar el módulo de stablecoins
const DEFAULT_MODULE_ID = "stablecoins-fundamentals";

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
    getCurrentGlobalIndex,
    getTotalSteps,
  } = useModuleProgressStore();

  const { markModuleCompleted } = useTrackProgressStore();

  useEffect(() => {
    // Siempre cargar el módulo por defecto
    const moduleContent = getModuleContent(DEFAULT_MODULE_ID);
    if (moduleContent) {
      setContent(moduleContent);
      initModule(DEFAULT_MODULE_ID);
    }
  }, [initModule]);

  if (!content) {
    return (
      <AuthGuard requireAuth={true} redirectTo="/">
        <Header />
        <ContainerSection padding="md" minHeight="screen">
          <ContainerContent maxWidth="compact" className="flex items-center justify-center">
            <p className="text-dark-300">Cargando...</p>
          </ContainerContent>
        </ContainerSection>
      </AuthGuard>
    );
  }

  const currentSection = content.sections[currentSectionIndex];
  const currentSubsection = currentSection?.subsections[currentStepIndex];
  const globalIndex = getCurrentGlobalIndex(content);
  const totalSteps = getTotalSteps(content);

  const handleContinue = () => {
    const hasNext = nextStep(content);
    if (!hasNext) {
      completeModule();
      markModuleCompleted(trackId, moduleId);
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

  if (isCompleted) {
    return (
      <AuthGuard requireAuth={true} redirectTo="/">
        <Header />
        <ContainerSection padding="md" minHeight="screen">
          <ContainerContent maxWidth="full" className="pt-20 flex justify-center">
            <div className="w-full max-w-lg px-4 sm:px-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-500/10 mb-6">
                  <Trophy className="size-10 text-gold-400" />
                </div>

                <h1 className="text-2xl font-bold text-dark-100 mb-3">
                  Modulo completado
                </h1>

                <p className="text-dark-400 mb-8">
                  Completaste "{content.title}". Tu progreso ha sido guardado.
                </p>

                <button
                  onClick={handleFinish}
                  className="px-6 py-3 rounded-xl bg-violet-500 text-white font-medium text-sm hover:bg-violet-600 transition-colors"
                >
                  Volver al track
                </button>
              </motion.div>
            </div>
          </ContainerContent>
        </ContainerSection>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header />
      <ContainerSection padding="md" minHeight="screen">
        <ContainerContent maxWidth="full" className="pt-6 pb-8 flex justify-center">
          <div className="w-full max-w-lg px-4 sm:px-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-200 transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span className="text-sm">Atras</span>
              </button>

              <span className="text-sm text-dark-500">
                {globalIndex + 1} / {totalSteps}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-dark-800 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((globalIndex + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Section title */}
            <p className="text-xs text-dark-500 uppercase tracking-wide mb-6">
              {currentSection.title}
            </p>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div key={`${currentSectionIndex}-${currentStepIndex}`}>
                {currentSubsection && renderSubsection(currentSubsection)}
              </motion.div>
            </AnimatePresence>
          </div>
        </ContainerContent>
      </ContainerSection>
    </AuthGuard>
  );
}
