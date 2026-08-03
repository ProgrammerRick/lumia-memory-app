import { storageAdapter } from "../storage/localStorageAdapter";
import { STORAGE_KEYS } from "../storage/keys";
import { generateId } from "../utils/id";
import type { CreateMemoryInput, Memory } from "../types/memory";

/**
 * Camada de serviço de Memórias.
 *
 * Regras de negócio ficam aqui, isoladas de telas e do adapter de
 * armazenamento. Quando a sincronização em nuvem for implementada
 * (fora do escopo da v0.1), este é o único arquivo que deve precisar
 * de mudanças relevantes (ex.: enfileirar `syncStatus: "pending"`).
 */
export const memoryService = {
  async list(): Promise<Memory[]> {
    const memories = await storageAdapter.getItem<Memory[]>(
      STORAGE_KEYS.memories,
    );
    const list = memories ?? [];
    return [...list].sort(
      (a, b) =>
        new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime(),
    );
  },

  async create(input: CreateMemoryInput): Promise<Memory> {
    const current = await this.list();
    const memory: Memory = {
      id: generateId(),
      title: input.title.trim(),
      description: input.description.trim(),
      occurredAt: input.occurredAt,
      createdAt: new Date().toISOString(),
      photoUri: input.photoUri,
      accentColor: input.accentColor,
      syncStatus: "local",
    };
    const updated = [memory, ...current];
    await storageAdapter.setItem(STORAGE_KEYS.memories, updated);
    return memory;
  },

  async remove(id: string): Promise<void> {
    const current = await this.list();
    const updated = current.filter((m) => m.id !== id);
    await storageAdapter.setItem(STORAGE_KEYS.memories, updated);
  },

  async clearAll(): Promise<void> {
    await storageAdapter.removeItem(STORAGE_KEYS.memories);
  },
};
