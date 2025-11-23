"use client";

import { motion } from "motion/react";
import type { InfoSubsection } from "../types/moduleContent";

interface InfoStepProps {
  subsection: InfoSubsection;
  onContinue: () => void;
}

export function InfoStep({ subsection, onContinue }: InfoStepProps) {
  const parseContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-dark-300 ml-4 list-disc">
            {line.substring(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={index} className="h-4" />;
      }
      return (
        <p key={index} className="text-dark-300">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-dark-100 mb-6">
        {subsection.title}
      </h2>

      <div className="space-y-2 mb-10">
        {parseContent(subsection.content)}
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3 rounded-xl bg-violet-500 text-white font-medium text-sm hover:bg-violet-600 transition-colors"
      >
        Continuar
      </button>
    </motion.div>
  );
}
