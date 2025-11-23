"use client";

import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import type { InfoSubsection } from "../types/moduleContent";

interface InfoStepProps {
  subsection: InfoSubsection;
  onContinue: () => void;
}

export function InfoStep({ subsection, onContinue }: InfoStepProps) {
  // Parsear el contenido con formato de lista
  const parseContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Lista con guión
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-dark-300 ml-4 mb-2 list-disc">
            {line.substring(2)}
          </li>
        );
      }
      // Línea vacía
      if (line.trim() === "") {
        return <div key={index} className="h-3" />;
      }
      // Texto normal
      return (
        <p key={index} className="text-dark-300 mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400">
          <BookOpen className="size-5" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-violet-400 font-semibold">
            Información
          </span>
          <h3 className="text-xl font-bold text-dark-100">{subsection.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 glass-card rounded-2xl p-6 mb-6 overflow-y-auto">
        <ul className="space-y-1">
          {parseContent(subsection.content)}
        </ul>
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-400 text-white font-bold text-sm uppercase tracking-wider transition-shadow hover:shadow-glow"
      >
        Continuar
      </motion.button>
    </motion.div>
  );
}
