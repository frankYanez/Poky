import { create } from "zustand";
import type { ModuleContent, SubsectionAnswer } from "../types/moduleContent";

interface ModuleProgressState {
  moduleId: string | null;
  currentSectionIndex: number;
  currentStepIndex: number; // índice de subsección actual
  completedSteps: Set<string>;
  answers: SubsectionAnswer[];
  startedAt: number | null;
  completedAt: number | null;

  // Acciones
  initModule: (moduleId: string) => void;
  goToStep: (sectionIndex: number, stepIndex: number) => void;
  nextStep: (content: ModuleContent) => boolean;
  prevStep: (content: ModuleContent) => boolean;
  markStepCompleted: (sectionIndex: number, stepIndex: number) => void;
  recordAnswer: (answer: SubsectionAnswer) => void;
  completeModule: () => void;
  resetProgress: () => void;

  // Getters
  isStepCompleted: (sectionIndex: number, stepIndex: number) => boolean;
  getProgress: (content: ModuleContent) => number;
  getCurrentGlobalIndex: (content: ModuleContent) => number;
  getTotalSteps: (content: ModuleContent) => number;
}

const getStepKey = (sectionIndex: number, stepIndex: number) =>
  `${sectionIndex}-${stepIndex}`;

export const useModuleProgressStore = create<ModuleProgressState>((set, get) => ({
  moduleId: null,
  currentSectionIndex: 0,
  currentStepIndex: 0,
  completedSteps: new Set(),
  answers: [],
  startedAt: null,
  completedAt: null,

  initModule: (moduleId) => {
    set({
      moduleId,
      currentSectionIndex: 0,
      currentStepIndex: 0,
      completedSteps: new Set(),
      answers: [],
      startedAt: Date.now(),
      completedAt: null,
    });
  },

  goToStep: (sectionIndex, stepIndex) => {
    set({
      currentSectionIndex: sectionIndex,
      currentStepIndex: stepIndex,
    });
  },

  nextStep: (content) => {
    const { currentSectionIndex, currentStepIndex, markStepCompleted } = get();
    const currentSection = content.sections[currentSectionIndex];

    markStepCompleted(currentSectionIndex, currentStepIndex);

    if (currentStepIndex < currentSection.subsections.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
      return true;
    }

    if (currentSectionIndex < content.sections.length - 1) {
      set({
        currentSectionIndex: currentSectionIndex + 1,
        currentStepIndex: 0,
      });
      return true;
    }

    return false;
  },

  prevStep: (content) => {
    const { currentSectionIndex, currentStepIndex } = get();

    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
      return true;
    }

    if (currentSectionIndex > 0) {
      const prevSection = content.sections[currentSectionIndex - 1];
      set({
        currentSectionIndex: currentSectionIndex - 1,
        currentStepIndex: prevSection.subsections.length - 1,
      });
      return true;
    }

    return false;
  },

  markStepCompleted: (sectionIndex, stepIndex) => {
    set((state) => {
      const newCompleted = new Set(state.completedSteps);
      newCompleted.add(getStepKey(sectionIndex, stepIndex));
      return { completedSteps: newCompleted };
    });
  },

  recordAnswer: (answer) => {
    set((state) => ({
      answers: [...state.answers, answer],
    }));
  },

  completeModule: () => {
    set({ completedAt: Date.now() });
  },

  resetProgress: () => {
    set({
      moduleId: null,
      currentSectionIndex: 0,
      currentStepIndex: 0,
      completedSteps: new Set(),
      answers: [],
      startedAt: null,
      completedAt: null,
    });
  },

  isStepCompleted: (sectionIndex, stepIndex) => {
    return get().completedSteps.has(getStepKey(sectionIndex, stepIndex));
  },

  getProgress: (content) => {
    const { completedSteps } = get();
    const totalSteps = get().getTotalSteps(content);
    if (totalSteps === 0) return 0;
    return Math.round((completedSteps.size / totalSteps) * 100);
  },

  getCurrentGlobalIndex: (content) => {
    const { currentSectionIndex, currentStepIndex } = get();
    let globalIndex = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      globalIndex += content.sections[i].subsections.length;
    }
    return globalIndex + currentStepIndex;
  },

  getTotalSteps: (content) => {
    return content.sections.reduce(
      (acc, section) => acc + section.subsections.length,
      0
    );
  },
}));
