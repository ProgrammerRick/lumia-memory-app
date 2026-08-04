import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Memory, MemoryFormData } from '@/types/memory';
import * as storage from '@/lib/storage';

interface MemoryContextType {
  memories: Memory[];
  refreshMemories: () => void;
  addMemory: (data: MemoryFormData) => Memory;
  editMemory: (id: string, data: Partial<MemoryFormData>) => Memory | undefined;
  removeMemory: (id: string) => boolean;
  toggleFav: (id: string) => Memory | undefined;
  getById: (id: string) => Memory | undefined;
}

const MemoryContext = createContext<MemoryContextType | null>(null);

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([]);

  const refreshMemories = useCallback(() => {
    setMemories(storage.getMemories());
  }, []);

  useEffect(() => {
    refreshMemories();
  }, [refreshMemories]);

  const addMemory = useCallback((data: MemoryFormData) => {
    const memory = storage.createMemory(data);
    refreshMemories();
    return memory;
  }, [refreshMemories]);

  const editMemory = useCallback((id: string, data: Partial<MemoryFormData>) => {
    const memory = storage.updateMemory(id, data);
    refreshMemories();
    return memory;
  }, [refreshMemories]);

  const removeMemory = useCallback((id: string) => {
    const result = storage.deleteMemory(id);
    refreshMemories();
    return result;
  }, [refreshMemories]);

  const toggleFav = useCallback((id: string) => {
    const memory = storage.toggleFavorite(id);
    refreshMemories();
    return memory;
  }, [refreshMemories]);

  const getById = useCallback((id: string) => {
    return storage.getMemoryById(id);
  }, []);

  return (
    <MemoryContext.Provider value={{
      memories,
      refreshMemories,
      addMemory,
      editMemory,
      removeMemory,
      toggleFav,
      getById,
    }}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemories() {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return context;
}
