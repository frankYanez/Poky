"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { SimpleSelectionSubsection, MultipleSelectionSubsection } from "../types/moduleContent";
import { cn } from "@/src/shared/lib/cn/utils";

interface SelectionStepProps {
  subsection: SimpleSelectionSubsection | MultipleSelectionSubsection;
  onAnswer: (selectedIndexes: number[], isCorrect: boolean) => void;
  onContinue: () => void;
}

export function SelectionStep({ subsection, onAnswer, onContinue }: SelectionStepProps) {
  const isMultiple = subsection.type === "MULTIPLE_SELECTION";
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionClick = (index: number) => {
    if (hasSubmitted) return;

    if (isMultiple) {
      setSelectedIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelectedIndexes([index]);
    }
  };

  const handleSubmit = () => {
    if (selectedIndexes.length === 0) return;

    const result = verifyAnswer(subsection, selectedIndexes);
    setIsCorrect(result);
    setHasSubmitted(true);
    onAnswer(selectedIndexes, result);
  };

  const verifyAnswer = (
    sub: SimpleSelectionSubsection | MultipleSelectionSubsection,
    selected: number[]
  ): boolean => {
    if (sub.type === "SIMPLE_SELECTION") {
      return selected[0] === 0;
    } else {
      const correctIndexes = [0, 1, 3, 4];
      return (
        selected.length === correctIndexes.length &&
        selected.sort().every((val, idx) => val === correctIndexes[idx])
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-dark-100 mb-2">
        {subsection.title}
      </h2>

      <p className="text-dark-400 mb-6">{subsection.content}</p>

      {isMultiple && (
        <p className="text-dark-500 text-sm mb-4">
          Selecciona todas las opciones correctas
        </p>
      )}

      <div className="space-y-3 mb-8">
        {subsection.options.map((option, index) => {
          const isSelected = selectedIndexes.includes(index);

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              disabled={hasSubmitted}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-colors",
                hasSubmitted
                  ? isSelected
                    ? isCorrect
                      ? "border-emerald-500/50 bg-emerald-500/5"
                      : "border-red-500/50 bg-red-500/5"
                    : "border-dark-700 bg-dark-800/50"
                  : isSelected
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-dark-700 bg-dark-800/50 hover:border-dark-600"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-colors",
                    isMultiple ? "rounded" : "rounded-full",
                    isSelected
                      ? hasSubmitted
                        ? isCorrect
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-red-500 bg-red-500"
                        : "border-violet-500 bg-violet-500"
                      : "border-dark-600"
                  )}
                >
                  {isSelected && <Check className="size-3 text-white" />}
                </div>
                <span className={cn(
                  "text-sm",
                  isSelected ? "text-dark-100" : "text-dark-300"
                )}>
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {hasSubmitted && (
        <p className={cn(
          "text-sm mb-6",
          isCorrect ? "text-emerald-400" : "text-red-400"
        )}>
          {isCorrect ? "Correcto" : "Incorrecto"}
        </p>
      )}

      {!hasSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIndexes.length === 0}
          className={cn(
            "w-full py-3 rounded-xl font-medium text-sm transition-colors",
            selectedIndexes.length > 0
              ? "bg-violet-500 text-white hover:bg-violet-600"
              : "bg-dark-800 text-dark-500 cursor-not-allowed"
          )}
        >
          Verificar
        </button>
      ) : (
        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl bg-violet-500 text-white font-medium text-sm hover:bg-violet-600 transition-colors"
        >
          Continuar
        </button>
      )}
    </motion.div>
  );
}
