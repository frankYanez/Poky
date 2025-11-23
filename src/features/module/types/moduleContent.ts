/**
 * Tipos para el contenido de módulos de aprendizaje
 * Formato estándar para renderizar módulos on-chain
 */

// Tipos de subsecciones disponibles
export type SubsectionType = "INFO" | "SIMPLE_SELECTION" | "MULTIPLE_SELECTION";

// Subsección base
export interface BaseSubsection {
  title: string;
  type: SubsectionType;
  content: string;
}

// Subsección de información (solo lectura)
export interface InfoSubsection extends BaseSubsection {
  type: "INFO";
}

// Subsección de selección simple (una respuesta correcta)
export interface SimpleSelectionSubsection extends BaseSubsection {
  type: "SIMPLE_SELECTION";
  options: string[];
  answerHash: string; // Hash para validación on-chain
}

// Subsección de selección múltiple (varias respuestas correctas)
export interface MultipleSelectionSubsection extends BaseSubsection {
  type: "MULTIPLE_SELECTION";
  options: string[];
  answersHash: string; // Hash para validación on-chain
}

// Unión de todos los tipos de subsección
export type Subsection = InfoSubsection | SimpleSelectionSubsection | MultipleSelectionSubsection;

// Sección del módulo (agrupa subsecciones relacionadas)
export interface Section {
  title: string;
  description: string;
  subsections: Subsection[];
}

// Contenido completo de un módulo
export interface ModuleContent {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

/**
 * Progreso del usuario en un módulo
 */
export interface ModuleProgress {
  moduleId: string;
  currentSectionIndex: number;
  currentSubsectionIndex: number;
  completedSubsections: Array<{ sectionIndex: number; subsectionIndex: number }>;
  answers: SubsectionAnswer[];
  startedAt: number;
  completedAt: number | null;
}

/**
 * Respuesta del usuario a una subsección
 */
export interface SubsectionAnswer {
  sectionIndex: number;
  subsectionIndex: number;
  selectedIndexes: number[];
  isCorrect: boolean | null;
  timestamp: number;
}

/**
 * Utilidades
 */
export function getTotalSubsections(content: ModuleContent): number {
  return content.sections.reduce((acc, section) => acc + section.subsections.length, 0);
}

export function getGlobalSubsectionIndex(
  content: ModuleContent,
  sectionIndex: number,
  subsectionIndex: number
): number {
  let globalIndex = 0;
  for (let i = 0; i < sectionIndex; i++) {
    globalIndex += content.sections[i].subsections.length;
  }
  return globalIndex + subsectionIndex;
}
