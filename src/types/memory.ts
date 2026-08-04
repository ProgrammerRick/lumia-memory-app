/**
 * Modelo de dados de uma Memória.
 *
 * Campos principais: título, descrição, data, categoria, sentimento e
 * imagem de capa.
 *
 * Campos de mídia: uma memória pode carregar uma lista de itens de mídia
 * (`media`) — imagens, vídeos e áudios — além da imagem de capa. Cada item
 * é guardado localmente como uma data URL (base64), no mesmo espírito da
 * `coverImage`.
 *
 * `location` e `syncStatus` continuam reservados, não implementados ainda.
 */
export interface Memory {
  /** Identificador único e estável da memória. */
  id: string;
  /** Título curto da memória. */
  title: string;
  /** Texto livre descrevendo o momento guardado. */
  description: string;
  /** Data (ISO, `yyyy-mm-dd`) em que o momento aconteceu — escolhida pelo usuário. */
  date: string;
  /** Categoria temática da memória. */
  category: MemoryCategory;
  /** Sentimento associado ao momento guardado. */
  feeling: MemoryFeeling;
  /** Imagem de capa, guardada localmente como data URL (base64). */
  coverImage?: string;
  /** Itens de mídia (fotos, vídeos, áudios) guardados nesta memória. */
  media?: MediaItem[];
  /** Data/hora (ISO) em que o registro foi criado no dispositivo. */
  createdAt: string;
  /** Data/hora (ISO) da última atualização do registro. */
  updatedAt: string;

  // ---- Preparado para etapas futuras — não implementado ainda ----
  /** Reservado para uma etapa futura de localização. */
  location?: {
    latitude: number;
    longitude: number;
    label?: string;
  };
  /** Reservado para uma etapa futura de sincronização/backend. */
  syncStatus?: "local" | "pending" | "synced";
}

/** Categorias temáticas disponíveis para organizar as memórias. */
export type MemoryCategory =
  | "viagem"
  | "familia"
  | "amor"
  | "amizade"
  | "conquista"
  | "cotidiano";

/** Sentimentos disponíveis para descrever a emoção do momento. */
export type MemoryFeeling =
  | "feliz"
  | "grato"
  | "nostalgico"
  | "emocionado"
  | "tranquilo"
  | "saudade";

/** Tipos de mídia suportados por uma memória. */
export type MediaType = "image" | "video" | "audio";

/**
 * Um único item de mídia anexado a uma memória.
 *
 * `url` é uma data URL (base64), guardada localmente — não há upload para
 * nenhum servidor ou nuvem nesta fase.
 */
export interface MediaItem {
  /** Identificador único do item de mídia. */
  id: string;
  /** Tipo de mídia. */
  type: MediaType;
  /** Conteúdo do arquivo, como data URL (base64). */
  url: string;
  /** Nome original do arquivo, para exibição. */
  name: string;
  /** Tamanho do arquivo em bytes. */
  size: number;
  /** Data/hora (ISO) em que o item foi adicionado. */
  createdAt: string;
}

/** Dados necessários para criar ou atualizar uma memória. */
export interface MemoryInput {
  title: string;
  description: string;
  date: string;
  category: MemoryCategory;
  feeling: MemoryFeeling;
  coverImage?: string;
  media?: MediaItem[];
}
