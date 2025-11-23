"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, CheckCircle2, XCircle, Check } from "lucide-react";
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

    // Verificación contra hash - en producción esto se haría on-chain
    // Por ahora simulamos la verificación
    const result = verifyAnswer(subsection, selectedIndexes);

    setIsCorrect(result);
    setHasSubmitted(true);
    onAnswer(selectedIndexes, result);
  };

  // Simulación de verificación - en producción se verificaría on-chain con el hash
  const verifyAnswer = (
    sub: SimpleSelectionSubsection | MultipleSelectionSubsection,
    selected: number[]
  ): boolean => {
    // TODO: Implementar verificación real con keccak256
    // const hash = keccak256(encode(selected.sort()));
    // return hash === sub.answerHash || hash === sub.answersHash;

    // Simulación basada en los hashes del JSON de ejemplo
    if (sub.type === "SIMPLE_SELECTION") {
      // Para las preguntas de ejemplo, la primera opción (index 0) es correcta
      // excepto "Elección de stablecoin" donde es la opción 0
      return selected[0] === 0;
    } else {
      // Para MULTIPLE_SELECTION, las opciones correctas son 0, 1, 3, 4
      // (todas excepto la 2 que es mala práctica)
      const correctIndexes = [0, 1, 3, 4];
      return (
        selected.length === correctIndexes.length &&
        selected.sort().every((val, idx) => val === correctIndexes[idx])
      );
    }
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
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400">
          <HelpCircle className="size-5" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            {isMultiple ? "Selección múltiple" : "Pregunta"}
          </span>
          <h3 className="text-xl font-bold text-dark-100">{subsection.title}</h3>
        </div>
      </div>

      {/* Question */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <p className="text-dark-200 text-lg">{subsection.content}</p>
        {isMultiple && (
          <p className="text-dark-400 text-sm mt-2">
            Selecciona todas las opciones correctas
          </p>
        )}
      </div>

      {/* Options */}
      <div className="flex-1 space-y-3 mb-6 overflow-y-auto">
        {subsection.options.map((option, index) => {
          const isSelected = selectedIndexes.includes(index);
          const showResult = hasSubmitted;

          let optionStyle = "border-dark-600/50 bg-dark-800/30";
          if (isSelected && !showResult) {
            optionStyle = "border-violet-500/50 bg-violet-500/10";
          }
          if (showResult && isSelected) {
            optionStyle = isCorrect
              ? "border-emerald-500/50 bg-emerald-500/10"
              : "border-red-500/50 bg-red-500/10";
          }

          return (
            <motion.button
              key={index}
              whileHover={!hasSubmitted ? { scale: 1.01 } : {}}
              whileTap={!hasSubmitted ? { scale: 0.99 } : {}}
              onClick={() => handleOptionClick(index)}
              disabled={hasSubmitted}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-all duration-200",
                optionStyle,
                !hasSubmitted && "cursor-pointer hover:border-violet-500/30"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-all",
                    isMultiple ? "rounded-md" : "rounded-full",
                    isSelected
                      ? "border-violet-500 bg-violet-500"
                      : "border-dark-500"
                  )}
                >
                  {isSelected && <Check className="size-4 text-white" />}
                </div>
                <span className={cn(
                  "text-sm",
                  isSelected ? "text-dark-100" : "text-dark-300"
                )}>
                  {option}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Result feedback */}
      <AnimatePresence>
        {hasSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "p-4 rounded-xl mb-4 flex items-center gap-3",
              isCorrect ? "bg-emerald-500/10" : "bg-red-500/10"
            )}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="size-6 text-emerald-400" />
                <div>
                  <p className="font-semibold text-emerald-400">¡Correcto!</p>
                  <p className="text-sm text-dark-300">
                    Excelente comprensión del concepto.
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="size-6 text-red-400" />
                <div>
                  <p className="font-semibold text-red-400">Incorrecto</p>
                  <p className="text-sm text-dark-300">
                    Revisa el contenido anterior e intenta de nuevo.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      {!hasSubmitted ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={selectedIndexes.length === 0}
          className={cn(
            "w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all",
            selectedIndexes.length > 0
              ? "bg-gradient-to-r from-amber-500 to-amber-400 text-dark-900 hover:shadow-glow"
              : "bg-dark-700 text-dark-400 cursor-not-allowed"
          )}
        >
          Verificar respuesta
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-violet-400 text-white font-bold text-sm uppercase tracking-wider transition-shadow hover:shadow-glow"
        >
          Continuar
        </motion.button>
      )}
    </motion.div>
  );
}
