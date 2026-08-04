import { AnimatePresence, motion } from "framer-motion";
import { Music, X } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { formatFileSize } from "../../services/media/mediaService";
import type { MediaItem } from "../../types/memory";

interface MediaGalleryProps {
  media: MediaItem[];
  /** Quando informado, exibe um botão de remoção em cada item (modo edição). */
  onRemove?: (id: string) => void;
}

/**
 * Galeria de mídias anexadas a uma memória.
 *
 * Usada tanto no formulário (`CreateMemoryScreen`, com `onRemove`) quanto na
 * tela de detalhe (`MemoryDetailScreen`, somente leitura). Fotos e vídeos
 * aparecem em grade; áudios aparecem em uma lista de players compactos —
 * tudo seguindo os mesmos tokens visuais (`glass-panel`, `rounded-2xl`,
 * cor dourada de destaque) já usados no restante do app.
 */
export function MediaGallery({ media, onRemove }: MediaGalleryProps) {
  if (media.length === 0) return null;

  const visualItems = media.filter((item) => item.type === "image" || item.type === "video");
  const audioItems = media.filter((item) => item.type === "audio");

  return (
    <div className="flex flex-col gap-3">
      {visualItems.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5">
          <AnimatePresence initial={false}>
            {visualItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square overflow-hidden rounded-2xl bg-white/5"
              >
                {item.type === "image" ? (
                  <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    controls
                    preload="metadata"
                  />
                )}
                <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remover ${item.type === "image" ? "foto" : "vídeo"}`}
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70"
                  >
                    <X size={13} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {audioItems.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {audioItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="flex items-center gap-3 !rounded-2xl p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lumia-gold/10 text-lumia-gold">
                    <Music size={16} strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-lumia-ink">{item.name}</p>
                    <p className="text-[11.5px] text-lumia-ink-faint">{formatFileSize(item.size)}</p>
                    <audio
                      src={item.url}
                      controls
                      preload="metadata"
                      className="mt-1.5 h-8 w-full accent-lumia-gold"
                    />
                  </div>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label="Remover áudio"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lumia-ink-faint transition-colors hover:bg-white/5 hover:text-lumia-rose"
                    >
                      <X size={14} />
                    </button>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
