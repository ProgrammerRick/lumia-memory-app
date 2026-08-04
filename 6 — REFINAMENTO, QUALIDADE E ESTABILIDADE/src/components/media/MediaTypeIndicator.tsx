import { Image as ImageIcon, Video, Music } from "lucide-react";
import type { MediaItem } from "../../types/memory";
import { countMediaByType } from "../../services/media/mediaService";

/**
 * Pequenos indicadores discretos usados dentro do `MemoryCard` (Home e
 * Timeline) para sinalizar que uma memória possui fotos, vídeos e/ou
 * áudios anexados — sem alterar o layout ou o tamanho do cartão existente.
 */
export function MediaTypeIndicator({ media }: { media?: MediaItem[] }) {
  const hasImages = countMediaByType(media, "image") > 0;
  const hasVideos = countMediaByType(media, "video") > 0;
  const hasAudios = countMediaByType(media, "audio") > 0;

  if (!hasImages && !hasVideos && !hasAudios) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-lumia-ink-faint">
      {hasImages && <ImageIcon size={11.5} strokeWidth={2} aria-label="Possui fotos" />}
      {hasVideos && <Video size={11.5} strokeWidth={2} aria-label="Possui vídeo" />}
      {hasAudios && <Music size={11.5} strokeWidth={2} aria-label="Possui áudio" />}
    </span>
  );
}
