/**
 * Modelo de domínio: Memória
 *
 * Representa um momento importante guardado pelo usuário.
 * Mantido enxuto propositalmente na v0.1 (somente local/offline).
 */
export interface Memory {
  id: string;
  title: string;
  description: string;
  /** Data em que a memória aconteceu (ISO 8601) */
  occurredAt: string;
  /** Data de criação do registro no app (ISO 8601) */
  createdAt: string;
  /** Imagem opcional, guardada localmente como data URL (base64) */
  photoUri?: string;
  /** Cor de destaque do cartão, para identidade visual variada */
  accentColor: MemoryAccent;
  /** Campo reservado para uso futuro (sync com nuvem) — não usado na v0.1 */
  syncStatus?: "local" | "pending" | "synced";
}

export type MemoryAccent = "gold" | "coral" | "lavender" | "rose";

export interface CreateMemoryInput {
  title: string;
  description: string;
  occurredAt: string;
  photoUri?: string;
  accentColor: MemoryAccent;
}
