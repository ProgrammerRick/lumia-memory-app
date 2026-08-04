import { motion } from "framer-motion";
import { X, Music } from "lucide-react";
import type { MediaItem } from "../../types/memory";
import { formatFileSize } from "../../services/media/mediaService";

interface MediaGalleryProps {
  media: MediaItem[];
  onRemove?: (id: string) => void;
}

/** Grade de fotos/vídeos e lista de áudios de uma memória. Somente leitura quando `onRemove` não é passado. */
export function MediaGallery({ media, onRemove }: MediaGalleryProps) {
  if (media.length === 0) return null;

  const visualItems = media.filter((item) => item.type === "image" || item.type === "video");
  const audioItems = media.filter((item) => item.type === "audio");

  return (
    <div className="flex flex-col gap-4">
      {visualItems.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {visualItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl bg-white/[0.06]"
            >
              {item.type === "image" ? (
                <img src={item.url} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <video src={item.url} className="h-full w-full object-cover" controls preload="metadata" />
              )}
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remover ${item.name}`}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-lumia-ink"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {audioItems.length > 0 && (
        <div className="flex flex-col gap-2">
          {audioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
              className="glass-panel flex items-center gap-3 rounded-2xl p-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <Music className="h-4 w-4 text-lumia-gold" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-lumia-ink-muted">{item.name}</p>
                <audio src={item.url} controls className="mt-1 h-8 w-full" preload="metadata" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-lumia-ink-faint">{formatFileSize(item.size)}</span>
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remover ${item.name}`}
                    className="text-lumia-ink-faint hover:text-lumia-rose"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
