import { useRef, useState } from "react";
import { Camera, Video, Mic } from "lucide-react";
import { Chip } from "../ui/Chip";
import { useToast } from "../../context/ToastContext";
import {
  MEDIA_ACCEPT,
  createMediaItem,
  isMediaFileTooLarge,
} from "../../services/media/mediaService";
import type { MediaItem, MediaType } from "../../types/memory";

interface MediaPickerOption {
  type: MediaType;
  label: string;
  icon: typeof Camera;
}

const OPTIONS: MediaPickerOption[] = [
  { type: "image", label: "Foto", icon: Camera },
  { type: "video", label: "Vídeo", icon: Video },
  { type: "audio", label: "Áudio", icon: Mic },
];

interface MediaPickerProps {
  onAdd: (item: MediaItem) => void;
}

/**
 * Linha de atalhos para anexar fotos, vídeos ou áudios a uma memória.
 *
 * Reaproveita o componente `Chip` já existente no Design System (mesmo
 * estilo de pílula usado para categoria/sentimento) e delega toda a leitura
 * de arquivo ao `services/media/mediaService`, nunca lidando com
 * `FileReader` diretamente dentro da tela.
 */
export function MediaPicker({ onAdd }: MediaPickerProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [loadingType, setLoadingType] = useState<MediaType | null>(null);
  const { showToast } = useToast();

  const inputRefs: Record<MediaType, React.RefObject<HTMLInputElement | null>> = {
    image: imageInputRef,
    video: videoInputRef,
    audio: audioInputRef,
  };

  const handleFile = async (type: MediaType, file: File | undefined) => {
    if (!file) return;
    if (isMediaFileTooLarge(file)) {
      showToast("Esse arquivo é grande demais para guardar localmente.", "error");
      return;
    }
    try {
      setLoadingType(type);
      const item = await createMediaItem(file, type);
      onAdd(item);
      showToast("Mídia adicionada.", "media");
    } catch (error) {
      console.error("Lumia: falha ao processar arquivo de mídia.", error);
      showToast("Não foi possível adicionar esse arquivo.", "error");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {OPTIONS.map(({ type, label, icon: Icon }) => (
        <div key={type}>
          <input
            ref={inputRefs[type]}
            type="file"
            accept={MEDIA_ACCEPT[type]}
            className="hidden"
            onChange={(event) => {
              void handleFile(type, event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <Chip
            label={loadingType === type ? "Adicionando..." : label}
            icon={<Icon size={14} strokeWidth={2} />}
            onClick={() => inputRefs[type].current?.click()}
          />
        </div>
      ))}
    </div>
  );
}
