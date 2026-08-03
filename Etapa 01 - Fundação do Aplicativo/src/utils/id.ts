/**
 * Gerador de identificadores locais.
 * Suficiente para uso offline; substituível por UUID de servidor
 * quando houver sincronização em nuvem no futuro.
 */
export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lumia_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
