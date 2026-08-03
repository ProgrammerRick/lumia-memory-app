import type { StorageAdapter } from "./StorageAdapter";

const NAMESPACE = "lumia";

/**
 * Implementação atual do StorageAdapter usando `window.localStorage`.
 *
 * Nota de arquitetura:
 * Esta implementação existe apenas porque a fundação deste projeto
 * está rodando sobre tooling web (ver README/CHANGELOG). Em uma build
 * Expo/React Native real, este arquivo seria substituído por um
 * adapter equivalente usando `AsyncStorage` — a interface pública
 * (`StorageAdapter`) permanece idêntica, então nenhuma tela ou service
 * precisa mudar.
 */
class LocalStorageAdapter implements StorageAdapter {
  private key(k: string) {
    return `${NAMESPACE}:${k}`;
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const raw = window.localStorage.getItem(this.key(key));
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      window.localStorage.setItem(this.key(key), JSON.stringify(value));
    } catch {
      // Armazenamento indisponível ou cheio — falha silenciosa
      // proposital na v0.1 (sem telemetria/backend nesta etapa).
    }
  }

  async removeItem(key: string): Promise<void> {
    window.localStorage.removeItem(this.key(key));
  }

  async clearAll(): Promise<void> {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(`${NAMESPACE}:`))
      .forEach((k) => window.localStorage.removeItem(k));
  }
}

export const storageAdapter: StorageAdapter = new LocalStorageAdapter();
