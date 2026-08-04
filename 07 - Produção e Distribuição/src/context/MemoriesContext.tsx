import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Memory, MemoryInput } from "../types/memory";
import { memoryRepository } from "../services/storage/memoryStorage";

interface MemoriesContextValue {
  memories: Memory[];
  /** `true` assim que a leitura inicial do armazenamento local terminou. */
  isReady: boolean;
  createMemory: (input: MemoryInput) => Memory;
  updateMemory: (id: string, input: MemoryInput) => Memory | undefined;
  deleteMemory: (id: string) => void;
  getMemory: (id: string) => Memory | undefined;
}

const MemoriesContext = createContext<MemoriesContextValue | undefined>(undefined);

/**
 * Estado de domínio compartilhado das memórias. Toda leitura/escrita passa
 * por `services/storage/memoryStorage`, nunca por `localStorage` direto.
 */
export function MemoriesProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Leitura local é síncrona, mas simulamos um pequeno respiro para evitar
    // uma transição abrupta direto para o estado vazio (Etapa 5).
    setMemories(memoryRepository.list());
    const timer = window.setTimeout(() => setIsReady(true), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const createMemory = useCallback((input: MemoryInput) => {
    const created = memoryRepository.create(input);
    setMemories(memoryRepository.list());
    return created;
  }, []);

  const updateMemory = useCallback((id: string, input: MemoryInput) => {
    const updated = memoryRepository.update(id, input);
    setMemories(memoryRepository.list());
    return updated;
  }, []);

  const deleteMemory = useCallback((id: string) => {
    memoryRepository.remove(id);
    setMemories(memoryRepository.list());
  }, []);

  const getMemory = useCallback(
    (id: string) => memories.find((memory) => memory.id === id) ?? memoryRepository.getById(id),
    [memories],
  );

  const value = useMemo(
    () => ({ memories, isReady, createMemory, updateMemory, deleteMemory, getMemory }),
    [memories, isReady, createMemory, updateMemory, deleteMemory, getMemory],
  );

  return <MemoriesContext.Provider value={value}>{children}</MemoriesContext.Provider>;
}

export function useMemories(): MemoriesContextValue {
  const context = useContext(MemoriesContext);
  if (!context) {
    throw new Error("useMemories deve ser usado dentro de um MemoriesProvider.");
  }
  return context;
}
