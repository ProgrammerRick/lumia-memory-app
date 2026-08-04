import type { MediaItem, MediaType } from "../../types/memory";

/** Tamanho máximo aceito por arquivo de mídia, em bytes (15 MB). */
export const MAX_MEDIA_FILE_SIZE = 15 * 1024 * 1024;

/** Verifica se um arquivo excede o tamanho máximo permitido. */
export function isMediaFileTooLarge(file: File): boolean {
  return file.size > MAX_MEDIA_FILE_SIZE;
}

/** Formata um tamanho em bytes para um texto legível (KB/MB). */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Lê um arquivo do dispositivo e devolve seu conteúdo como data URL. */
function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Não foi possível ler o arquivo selecionado."));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error("Falha ao ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

/**
 * Cria um `MediaItem` a partir de um arquivo do dispositivo, convertendo-o
 * para data URL. Lança erro se o arquivo for grande demais.
 */
export async function createMediaItem(file: File, type: MediaType): Promise<MediaItem> {
  if (isMediaFileTooLarge(file)) {
    throw new Error(`"${file.name}" é grande demais (máx. 15 MB por arquivo).`);
  }

  const url = await readFileAsDataUrl(file);

  return {
    id: crypto.randomUUID(),
    type,
    url,
    name: file.name || "arquivo",
    size: file.size,
    createdAt: new Date().toISOString(),
  };
}

/** Conta quantos itens de mídia existem por tipo, para indicadores visuais. */
export function countMediaByType(media: MediaItem[] | undefined): Record<MediaType, number> {
  const counts: Record<MediaType, number> = { image: 0, video: 0, audio: 0 };
  for (const item of media ?? []) {
    counts[item.type] += 1;
  }
  return counts;
}
