import { AnimatePresence, motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import { cn } from "../../utils/cn";

interface ImagePickerProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  label?: string;
  className?: string;
}

/** Seletor de imagem de capa, com pré-visualização e opção de remover. */
export function ImagePicker({ value, onChange, label = "Foto de capa", className }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        aria-hidden="true"
        tabIndex={-1}
      />
      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl"
          >
            <img src={value} alt="Prévia da capa da memória" className="h-44 w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              aria-label="Remover foto de capa"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-lumia-ink backdrop-blur"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="empty"
            type="button"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex h-44 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-lumia-border bg-white/[0.03] text-lumia-ink-faint transition-colors hover:text-lumia-ink-muted",
            )}
          >
            <ImagePlus className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm">{label}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
