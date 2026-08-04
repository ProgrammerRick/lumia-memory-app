import type { Memory, MemoryInput } from "../../types/memory";

const STORAGE_KEY = "lumia:memories";

/**
 * Contrato de acesso a dados de memórias, isolado das telas para permitir,
 * no futuro, trocar a implementação (ex.: um banco local mais robusto ou
 * sincronização) sem alterar nenhuma tela do app.
 */
export interface MemoryRepository {
  list(): Memory[];
  getById(id: string): Memory | undefined;
  create(input: MemoryInput): Memory;
  update(id: string, input: MemoryInput): Memory | undefined;
  remove(id: string): void;
}

/** Lê e valida a lista de memórias salva em `localStorage`. */
function readAll(): Memory[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidMemoryShape);
  } catch (error) {
    console.error("Lumia: não foi possível ler as memórias salvas.", error);
    return [];
  }
}

/** Validação defensiva mínima para evitar registros corrompidos no app. */
function isValidMemoryShape(value: unknown): value is Memory {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Memory>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.date === "string"
  );
}

function writeAll(memories: Memory[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  } catch (error) {
    console.error("Lumia: não foi possível salvar as memórias.", error);
    throw new Error(
      "Não foi possível salvar sua memória. O armazenamento local pode estar cheio.",
    );
  }
}

/** Implementação local (100% no dispositivo) do repositório de memórias. */
export class LocalStorageMemoryRepository implements MemoryRepository {
  list(): Memory[] {
    return readAll();
  }

  getById(id: string): Memory | undefined {
    return readAll().find((memory) => memory.id === id);
  }

  create(input: MemoryInput): Memory {
    const now = new Date().toISOString();
    const memory: Memory = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description.trim(),
      date: input.date,
      category: input.category,
      feeling: input.feeling,
      coverImage: input.coverImage,
      media: input.media ?? [],
      createdAt: now,
      updatedAt: now,
    };

    const memories = readAll();
    memories.unshift(memory);
    writeAll(memories);
    return memory;
  }

  update(id: string, input: MemoryInput): Memory | undefined {
    const memories = readAll();
    const index = memories.findIndex((memory) => memory.id === id);
    if (index === -1) return undefined;

    const updated: Memory = {
      ...memories[index],
      title: input.title.trim(),
      description: input.description.trim(),
      date: input.date,
      category: input.category,
      feeling: input.feeling,
      coverImage: input.coverImage,
      media: input.media ?? [],
      updatedAt: new Date().toISOString(),
    };

    memories[index] = updated;
    writeAll(memories);
    return updated;
  }

  remove(id: string): void {
    const memories = readAll().filter((memory) => memory.id !== id);
    writeAll(memories);
  }
}

export const memoryRepository: MemoryRepository = new LocalStorageMemoryRepository();
