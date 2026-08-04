import { Image, Video, Mic } from "lucide-react";
import type { MediaItem } from "../../types/memory";
import { countMediaByType } from "../../services/media/mediaService";

/** Pequenos ícones discretos indicando quais tipos de mídia uma memória possui. */
export function MediaTypeIndicator({ media }: { media?: MediaItem[] }) {
  if (!media || media.length === 0) return null;
  const counts = countMediaByType(media);

  return (
    <div className="inline-flex items-center gap-1.5 text-lumia-ink-faint" aria-label="Mídia anexada">
      {counts.image > 0 && <Image className="h-3.5 w-3.5" aria-hidden="true" />}
      {counts.video > 0 && <Video className="h-3.5 w-3.5" aria-hidden="true" />}
      {counts.audio > 0 && <Mic className="h-3.5 w-3.5" aria-hidden="true" />}
    </div>
  );
}
