/**
 * Modelo de dados de uma Memória — Etapa 3 (Sistema de Memórias).
 *
 * Campos principais implementados nesta etapa: título, descrição, data,
 * categoria, sentimento e imagem de capa.
 *
 * Campos opcionais (`videoUrl`, `audioUrl`, `location`, `syncStatus`) já
 * modelam o formato que a Memória terá em etapas futuras (vídeo, áudio,
 * localização e sincronização), mas **não são preenchidos nem usados**
 * nesta etapa — existem apenas para que o tipo não precise ser quebrado
 * mais adiante.
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
  /** Data/hora (ISO) em que o registro foi criado no dispositivo. */
  createdAt: string;
  /** Data/hora (ISO) da última atualização do registro. */
  updatedAt: string;

  // ---- Preparado para etapas futuras — não implementado ainda ----
  /** Reservado para a Etapa 4 (vídeo). */
  videoUrl?: string;
  /** Reservado para a Etapa 4 (áudio). */
  audioUrl?: string;
  /** Reservado para uma etapa futura de localização. */
  location?: {
    latitude: number;
    longitude: number;
    label?: string;
  };
  /** Reservado para a Etapa 6 (sincronização/backend). */
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

/** Dados necessários para criar ou atualizar uma memória. */
export interface MemoryInput {
  title: string;
  description: string;
  date: string;
  category: MemoryCategory;
  feeling: MemoryFeeling;
  coverImage?: string;
}
