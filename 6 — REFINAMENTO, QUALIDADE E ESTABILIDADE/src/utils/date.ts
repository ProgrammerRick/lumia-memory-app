import type { Memory } from "../types/memory";

/** Formata uma data ISO (`yyyy-mm-dd`) por extenso, em português. */
export function formatMemoryDate(dateIso: string): string {
  const date = parseDateOnly(dateIso);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Formata uma data ISO de forma curta (ex.: "14 mar"). */
export function formatMemoryDateShort(dateIso: string): string {
  const date = parseDateOnly(dateIso);
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
}

/** Evita problemas de fuso horário ao interpretar uma data "yyyy-mm-dd". */
function parseDateOnly(dateIso: string): Date {
  const [year, month, day] = dateIso.split("-").map(Number);
  if (!year || !month || !day) return new Date(dateIso);
  return new Date(year, month - 1, day, 12);
}

/** Retorna a data de hoje no formato usado pelo input `type="date"`. */
export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export interface MemoryGroup {
  key: string;
  label: string;
  memories: Memory[];
}

/** Agrupa memórias por mês/ano (já ordenadas da mais recente para a mais antiga). */
export function groupMemoriesByMonth(memories: Memory[]): MemoryGroup[] {
  const groups = new Map<string, MemoryGroup>();

  for (const memory of memories) {
    const date = parseDateOnly(memory.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

    if (!groups.has(key)) {
      groups.set(key, { key, label, memories: [] });
    }
    groups.get(key)!.memories.push(memory);
  }

  return Array.from(groups.values());
}
