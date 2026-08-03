import { storageAdapter } from "../storage/localStorageAdapter";
import { STORAGE_KEYS } from "../storage/keys";

/**
 * Controla se o usuário já passou pela tela de boas-vindas.
 * Totalmente local — sem contas, sem servidor.
 */
export const onboardingService = {
  async hasCompleted(): Promise<boolean> {
    const value = await storageAdapter.getItem<boolean>(
      STORAGE_KEYS.hasOnboarded,
    );
    return value === true;
  },

  async complete(): Promise<void> {
    await storageAdapter.setItem(STORAGE_KEYS.hasOnboarded, true);
  },

  async reset(): Promise<void> {
    await storageAdapter.removeItem(STORAGE_KEYS.hasOnboarded);
  },
};
