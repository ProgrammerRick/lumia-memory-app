import type { Memory, MemoryInput } from "../../types/memory";

/**
 * Camada de armazenamento de memórias.
 *
 * Nenhuma tela deve falar diretamente com `localStorage` — todo acesso a
 * dados passa por este serviço. O contrato `MemoryRepository` é o que
 * importa para o resto do app; a implementação concreta de hoje
 * (`LocalStorageMemoryRepository`) pode ser substituída no futuro por uma
 * versão que use SQLite, um banco online ou sincronização em nuvem, sem que
 * nenhuma tela precise mudar.
 *
 * Desde a Etapa 4, os registros também carregam um array `media` (fotos,
 * vídeos, áudios). Ele é persistido como parte do próprio registro da
 * memória, sem exigir nenhuma mudança estrutural nesta camada.
 */
export interface MemoryRepository {
  list(): Memory[];
  getById(id: string): Memory | undefined;
  create(input: MemoryInput): Memory;
  update(id: string, changes: Partial<MemoryInput>): Memory | undefined;
  remove(id: string): void;
}

const STORAGE_KEY = "lumia:memories";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `mem_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Implementação local (LocalStorage) do repositório de memórias.
 * É a única classe deste arquivo que sabe que os dados vivem no navegador —
 * qualquer troca futura de persistência (SQLite, API, nuvem) deve apenas
 * implementar a mesma interface `MemoryRepository`.
 */
class LocalStorageMemoryRepository implements MemoryRepository {
  private read(): Memory[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Lumia: falha ao ler memórias do armazenamento local.", error);
      return [];
    }
  }

  private write(memories: Memory[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    } catch (error) {
      console.error("Lumia: falha ao salvar memórias no armazenamento local.", error);
    }
  }

  list(): Memory[] {
    return this.read().sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  getById(id: string): Memory | undefined {
    return this.read().find((memory) => memory.id === id);
  }

  create(input: MemoryInput): Memory {
    const timestamp = nowIso();
    const memory: Memory = {
      id: generateId(),
      title: input.title.trim(),
      description: input.description.trim(),
      date: input.date,
      category: input.category,
      feeling: input.feeling,
      coverImage: input.coverImage,
      media: input.media ?? [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const memories = this.read();
    memories.push(memory);
    this.write(memories);
    return memory;
  }

  update(id: string, changes: Partial<MemoryInput>): Memory | undefined {
    const memories = this.read();
    const index = memories.findIndex((memory) => memory.id === id);
    if (index === -1) return undefined;

    const updated: Memory = {
      ...memories[index],
      ...changes,
      title: changes.title !== undefined ? changes.title.trim() : memories[index].title,
      description:
        changes.description !== undefined ? changes.description.trim() : memories[index].description,
      media: changes.media !== undefined ? changes.media : memories[index].media,
      updatedAt: nowIso(),
    };
    memories[index] = updated;
    this.write(memories);
    return updated;
  }

  remove(id: string): void {
    const memories = this.read().filter((memory) => memory.id !== id);
    this.write(memories);
  }
}

/** Instância única do repositório, usada em todo o app via `MemoriesContext`. */
export const memoryRepository: MemoryRepository = new LocalStorageMemoryRepository();
