import { useCallback, useEffect, useState } from "react";
import { memoryService } from "../services/memoryService";
import type { CreateMemoryInput, Memory } from "../types/memory";

/**
 * Hook central de acesso às memórias armazenadas localmente.
 * Mantém a UI desacoplada da camada de serviço/armazenamento.
 */
export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const list = await memoryService.list();
    setMemories(list);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createMemory = useCallback(
    async (input: CreateMemoryInput) => {
      const created = await memoryService.create(input);
      await refresh();
      return created;
    },
    [refresh],
  );

  const removeMemory = useCallback(
    async (id: string) => {
      await memoryService.remove(id);
      await refresh();
    },
    [refresh],
  );

  const clearAll = useCallback(async () => {
    await memoryService.clearAll();
    await refresh();
  }, [refresh]);

  return { memories, isLoading, createMemory, removeMemory, clearAll, refresh };
}
