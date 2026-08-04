import type { Memory } from "../types/memory";

const MONTH_LABELS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

/** Retorna a data de hoje no formato `yyyy-mm-dd`, para uso em inputs de data. */
export function todayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Formata uma data ISO (`yyyy-mm-dd`) para exibição amigável em pt-BR. */
export function formatMemoryDate(dateIso: string): string {
  if (!dateIso) return "";
  const [year, month, day] = dateIso.split("-").map(Number);
  if (!year || !month || !day) return dateIso;
  return `${day} de ${MONTH_LABELS[month - 1]} de ${year}`;
}

/** Formata uma data ISO de forma curta (ex.: "12 Mai"). */
export function formatMemoryDateShort(dateIso: string): string {
  if (!dateIso) return "";
  const [, month, day] = dateIso.split("-").map(Number);
  if (!month || !day) return dateIso;
  return `${day} ${MONTH_LABELS[month - 1].slice(0, 3)}`;
}

export interface MemoryMonthGroup {
  key: string;
  label: string;
  memories: Memory[];
}

/** Agrupa memórias por mês/ano (mais recente primeiro), ordenadas por data. */
export function groupMemoriesByMonth(memories: Memory[]): MemoryMonthGroup[] {
  const sorted = [...memories].sort((a, b) => (a.date < b.date ? 1 : -1));
  const groups = new Map<string, MemoryMonthGroup>();

  for (const memory of sorted) {
    const [year, month] = memory.date.split("-");
    if (!year || !month) continue;
    const key = `${year}-${month}`;
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: `${MONTH_LABELS[Number(month) - 1]} de ${year}`,
        memories: [],
      });
    }
    groups.get(key)!.memories.push(memory);
  }

  return Array.from(groups.values());
}
