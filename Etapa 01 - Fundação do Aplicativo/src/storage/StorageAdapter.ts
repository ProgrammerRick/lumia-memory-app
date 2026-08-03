/**
 * Contrato de armazenamento local do Lumia.
 *
 * Por que essa abstração existe:
 * O app v0.1 é 100% offline (sem backend, sem contas, sem nuvem).
 * Ainda assim, toda a aplicação conversa apenas com esta interface —
 * nunca diretamente com `localStorage`/`AsyncStorage`.
 *
 * Isso deixa o caminho pronto para o futuro (Passo 6+ do roadmap):
 *   - trocar `LocalStorageAdapter` por um adapter baseado em
 *     `@react-native-async-storage/async-storage` ou SQLite (Expo);
 *   - adicionar um `CloudSyncAdapter` que implementa a mesma interface
 *     e sincroniza em segundo plano, sem alterar `services/`.
 */
export interface StorageAdapter {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
  clearAll(): Promise<void>;
}
