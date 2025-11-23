import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TrackProgressState {
  // Map de trackId -> Set de moduleIds completados
  completedModules: Record<string, string[]>;

  // Acciones
  markModuleCompleted: (trackId: string, moduleId: string) => void;
  isModuleCompleted: (trackId: string, moduleId: string) => boolean;
  getCompletedCount: (trackId: string) => number;
  resetTrackProgress: (trackId: string) => void;
  resetAllProgress: () => void;
}

export const useTrackProgressStore = create<TrackProgressState>()(
  persist(
    (set, get) => ({
      completedModules: {},

      markModuleCompleted: (trackId, moduleId) => {
        set((state) => {
          const currentCompleted = state.completedModules[trackId] || [];
          if (currentCompleted.includes(moduleId)) {
            return state; // Ya está completado
          }
          return {
            completedModules: {
              ...state.completedModules,
              [trackId]: [...currentCompleted, moduleId],
            },
          };
        });
      },

      isModuleCompleted: (trackId, moduleId) => {
        const completed = get().completedModules[trackId] || [];
        return completed.includes(moduleId);
      },

      getCompletedCount: (trackId) => {
        return (get().completedModules[trackId] || []).length;
      },

      resetTrackProgress: (trackId) => {
        set((state) => {
          const { [trackId]: _, ...rest } = state.completedModules;
          return { completedModules: rest };
        });
      },

      resetAllProgress: () => {
        set({ completedModules: {} });
      },
    }),
    {
      name: "track-progress-storage",
    }
  )
);
