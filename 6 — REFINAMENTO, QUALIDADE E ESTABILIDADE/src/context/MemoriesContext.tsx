import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { memoryRepository } from "../services/storage/memoryStorage";
import type { Memory, MemoryInput } from "../types/memory";

interface MemoriesContextValue {
  /** Todas as memórias guardadas, mais recentes primeiro. */
  memories: Memory[];
  /** Indica se a leitura inicial do armazenamento local já terminou. */
  isReady: boolean;
  /** Cria uma nova memória e a devolve já persistida. */
  createMemory: (input: MemoryInput) => Memory;
  /** Atualiza uma memória existente. Retorna `undefined` se o id não existir. */
  updateMemory: (id: string, changes: Partial<MemoryInput>) => Memory | undefined;
  /** Remove uma memória permanentemente. */
  deleteMemory: (id: string) => void;
  /** Busca uma memória pelo id. */
  getMemory: (id: string) => Memory | undefined;
}

const MemoriesContext = createContext<MemoriesContextValue | undefined>(undefined);

/**
 * Provider de domínio das memórias.
 *
 * Mantém o estado em memória (React state) sincronizado com a camada de
 * armazenamento (`services/storage/memoryStorage`), para que todas as telas
 * (Home, Timeline, Criar/Editar, Detalhe) compartilhem a mesma fonte de
 * verdade e reajam imediatamente a criações, edições e exclusões.
 *
 * `isReady` foi adicionado na Etapa 5 apenas como um pequeno sinal de
 * "carregamento inicial" — não muda a fonte de dados (continua 100% local
 * e síncrona), apenas permite que as telas mostrem um estado de
 * carregamento breve e elegante em vez de piscar direto para o vazio.
 */
export function MemoriesProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>(() => memoryRepository.list());
  const [isReady, setIsReady] = useState(false);

  useState(() => {
    if (typeof window !== "undefined") {
      window.setTimeout(() => setIsReady(true), 260);
    } else {
      setIsReady(true);
    }
    return null;
  });

  const createMemory = (input: MemoryInput) => {
    const created = memoryRepository.create(input);
    setMemories(memoryRepository.list());
    return created;
  };

  const updateMemory = (id: string, changes: Partial<MemoryInput>) => {
    const updated = memoryRepository.update(id, changes);
    setMemories(memoryRepository.list());
    return updated;
  };

  const deleteMemory = (id: string) => {
    memoryRepository.remove(id);
    setMemories(memoryRepository.list());
  };

  const getMemory = (id: string) => memories.find((memory) => memory.id === id);

  const value = useMemo(
    () => ({ memories, isReady, createMemory, updateMemory, deleteMemory, getMemory }),
    [memories, isReady]
  );

  return <MemoriesContext.Provider value={value}>{children}</MemoriesContext.Provider>;
}

export function useMemories() {
  const ctx = useContext(MemoriesContext);
  if (!ctx) {
    throw new Error("useMemories deve ser usado dentro de um MemoriesProvider");
  }
  return ctx;
}
