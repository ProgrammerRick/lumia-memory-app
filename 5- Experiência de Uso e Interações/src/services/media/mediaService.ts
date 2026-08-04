import type { MediaItem, MediaType } from "../../types/memory";

/**
 * Camada de leitura/preparo de arquivos de mídia (Etapa 4).
 *
 * Assim como `services/storage/memoryStorage.ts` isola o acesso a dados,
 * este serviço isola a leitura de arquivos do dispositivo (galeria, câmera,
 * gravações) — nenhuma tela deve usar `FileReader` diretamente. Hoje os
 * arquivos são convertidos em data URL e guardados localmente; no futuro,
 * esta é a única camada que precisaria mudar para enviar arquivos a um
 * armazenamento remoto.
 */

/** Tipos de arquivo aceitos por seletor, usados no atributo `accept` dos inputs. */
export const MEDIA_ACCEPT: Record<MediaType, string> = {
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
};

/** Tamanho máximo recomendado por arquivo, para manter o `localStorage` saudável (15 MB). */
export const MAX_MEDIA_FILE_SIZE = 15 * 1024 * 1024;

function generateMediaId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `media_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

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

/** Verifica se um arquivo está dentro do tamanho aceito para guardar localmente. */
export function isMediaFileTooLarge(file: File): boolean {
  return file.size > MAX_MEDIA_FILE_SIZE;
}

/**
 * Converte um `File` escolhido pelo usuário em um `MediaItem` pronto para
 * ser anexado a uma memória (id, data URL, nome, tamanho e data).
 */
export async function createMediaItem(file: File, type: MediaType): Promise<MediaItem> {
  const url = await readFileAsDataUrl(file);
  return {
    id: generateMediaId(),
    type,
    url,
    name: file.name,
    size: file.size,
    createdAt: new Date().toISOString(),
  };
}

/** Formata bytes em um texto curto e legível (ex.: "2.4 MB"). */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

/** Conta quantos itens de um determinado tipo existem em uma lista de mídia. */
export function countMediaByType(media: MediaItem[] | undefined, type: MediaType): number {
  if (!media) return 0;
  return media.filter((item) => item.type === type).length;
}
