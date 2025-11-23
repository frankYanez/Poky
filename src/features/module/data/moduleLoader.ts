import type { ModuleContent } from "../types/moduleContent";

// Importar módulos JSON
import stablecoinsModule from "./modules/stablecoins.json";

/**
 * Registro de todos los módulos disponibles
 * En producción esto se cargaría desde la blockchain
 */
const modulesRegistry: Record<string, ModuleContent> = {
  "stablecoins-fundamentals": stablecoinsModule as ModuleContent,
};

/**
 * Obtiene el contenido de un módulo por su ID
 */
export function getModuleContent(moduleId: string): ModuleContent | null {
  return modulesRegistry[moduleId] || null;
}

/**
 * Lista todos los IDs de módulos disponibles
 */
export function getAvailableModuleIds(): string[] {
  return Object.keys(modulesRegistry);
}

/**
 * Verifica si un módulo existe
 */
export function moduleExists(moduleId: string): boolean {
  return moduleId in modulesRegistry;
}
