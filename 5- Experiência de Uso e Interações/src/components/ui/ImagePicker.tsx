import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { cn } from "../../utils/cn";

interface ImagePickerProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  className?: string;
}

/**
 * Seletor de imagem de capa para uma memória.
 *
 * Permite escolher uma imagem da galeria/dispositivo (input de arquivo
 * nativo, `accept="image/*"`), convertendo-a para uma data URL guardada
 * localmente. Reservado exclusivamente para a imagem de capa — a partir da
 * Etapa 4, o anexo de múltiplas fotos/vídeos/áudios é feito pelo
 * `MediaPicker` (`src/components/media/`), que reaproveita o mesmo padrão
 * visual e o mesmo serviço de leitura de arquivos.
 */
export function ImagePicker({ value, onChange, className }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-48 w-full overflow-hidden rounded-3xl"
          >
            <img src={value} alt="Capa da memória" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              aria-label="Remover imagem"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
            >
              <X size={16} />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-3 left-3 rounded-full bg-black/40 px-3.5 py-2 text-[12.5px] font-medium text-white backdrop-blur-md transition-colors hover:bg-black/60"
            >
              Trocar imagem
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="empty"
            type="button"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => inputRef.current?.click()}
            className="glass-panel flex h-48 w-full flex-col items-center justify-center gap-3 rounded-3xl border-dashed text-lumia-ink-faint"
          >
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-lumia-gold">
              <span className="absolute inset-0 -z-10 rounded-full bg-lumia-gold/10 blur-lg" />
              <ImagePlus size={22} strokeWidth={1.75} />
            </span>
            <span className="text-[13.5px] font-medium text-lumia-ink-muted">
              Escolher uma foto da galeria
            </span>
            <span className="text-[12px] text-lumia-ink-faint">Opcional, mas ajuda a lembrar</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
