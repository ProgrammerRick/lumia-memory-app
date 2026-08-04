import { Camera, Video, Mic } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import type { MediaItem, MediaType } from "../../types/memory";
import { createMediaItem } from "../../services/media/mediaService";
import { Chip } from "../ui/Chip";
import { useToast } from "../../context/ToastContext";

interface MediaPickerProps {
  onAdd: (item: MediaItem) => void;
}

/** Três atalhos para anexar fotos, vídeos ou áudios a uma memória. */
export function MediaPicker({ onAdd }: MediaPickerProps) {
  const { showToast } = useToast();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>, type: MediaType) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const item = await createMediaItem(file, type);
      onAdd(item);
      showToast("Mídia adicionada à memória.", "media");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível adicionar este arquivo.";
      showToast(message, "error");
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event, "image")}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(event) => handleFile(event, "video")}
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(event) => handleFile(event, "audio")}
      />

      <Chip label="Foto" emoji={<Camera className="h-3.5 w-3.5" aria-hidden="true" />} onClick={() => imageInputRef.current?.click()} />
      <Chip label="Vídeo" emoji={<Video className="h-3.5 w-3.5" aria-hidden="true" />} onClick={() => videoInputRef.current?.click()} />
      <Chip label="Áudio" emoji={<Mic className="h-3.5 w-3.5" aria-hidden="true" />} onClick={() => audioInputRef.current?.click()} />
    </div>
  );
}
