import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import { ChevronLeft } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { Chip } from "../components/ui/Chip";
import { ImagePicker } from "../components/ui/ImagePicker";
import { Button } from "../components/ui/Button";
import { MediaPicker } from "../components/media/MediaPicker";
import { MediaGallery } from "../components/media/MediaGallery";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { useToast } from "../context/ToastContext";
import { CATEGORY_OPTIONS, FEELING_OPTIONS } from "../utils/memoryMeta";
import { todayIso } from "../utils/date";
import type { MediaItem, MemoryCategory, MemoryFeeling } from "../types/memory";

/** Formulário de criação/edição de memória (a mesma tela cobre os dois casos). */
export function CreateMemoryScreen() {
  const { params, navigate } = useNavigation();
  const { getMemory, createMemory, updateMemory } = useMemories();
  const { showToast } = useToast();

  const editingMemory = useMemo(
    () => (params.memoryId ? getMemory(params.memoryId) : undefined),
    [params.memoryId, getMemory],
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayIso());
  const [category, setCategory] = useState<MemoryCategory>("cotidiano");
  const [feeling, setFeeling] = useState<MemoryFeeling>("feliz");
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [titleError, setTitleError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!editingMemory) return;
    setTitle(editingMemory.title);
    setDescription(editingMemory.description);
    setDate(editingMemory.date);
    setCategory(editingMemory.category);
    setFeeling(editingMemory.feeling);
    setCoverImage(editingMemory.coverImage);
    setMedia(editingMemory.media ?? []);
  }, [editingMemory]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setDate(todayIso());
    setCategory("cotidiano");
    setFeeling("feliz");
    setCoverImage(undefined);
    setMedia([]);
    setTitleError(false);
  }

  async function handleSave() {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    setIsSaving(true);
    try {
      // Pequeno respiro proposital: transforma o salvamento em um gesto
      // perceptível, sem atrasar de verdade a persistência local.
      await new Promise((resolve) => window.setTimeout(resolve, 400));

      const input = { title, description, date, category, feeling, coverImage, media };

      if (editingMemory) {
        updateMemory(editingMemory.id, input);
        showToast("Memória atualizada.", "success");
        navigate("memory-detail", { memoryId: editingMemory.id });
      } else {
        const created = createMemory(input);
        showToast("Memória guardada com carinho.", "success");
        resetForm();
        navigate("memory-detail", { memoryId: created.id });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível salvar sua memória.";
      showToast(message, "error");
    } finally {
      setIsSaving(false);
    }
  }

  function handleRemoveMedia(id: string) {
    setMedia((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto px-6 pb-6 pt-8">
      <ScreenHeader
        eyebrow={editingMemory ? "Editar memória" : "Nova memória"}
        title={editingMemory ? "Ajuste os detalhes" : "Guarde este momento"}
        subtitle="Escreva com calma — isso é só seu."
        leading={
          <IconButton aria-label="Voltar" onClick={() => navigate(editingMemory ? "memory-detail" : "home", editingMemory ? { memoryId: editingMemory.id } : undefined)}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        }
      />

      <form
        className="mt-6 flex flex-1 flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <ImagePicker value={coverImage} onChange={setCoverImage} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
          <label htmlFor="memory-title" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
            Título
          </label>
          <input
            id="memory-title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value.trim()) setTitleError(false);
            }}
            placeholder="Ex.: Tarde na praia com a família"
            aria-invalid={titleError}
            className="glass-panel w-full rounded-2xl px-4 py-3 text-sm text-lumia-ink placeholder:text-lumia-ink-faint outline-none"
          />
          {titleError && (
            <p role="alert" className="mt-1.5 text-xs text-lumia-rose">
              Dê um título para esta memória.
            </p>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <label htmlFor="memory-description" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
            Descrição
          </label>
          <textarea
            id="memory-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Conte como foi..."
            rows={4}
            className="glass-panel w-full resize-none rounded-2xl px-4 py-3 text-sm leading-relaxed text-lumia-ink placeholder:text-lumia-ink-faint outline-none"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <label htmlFor="memory-date" className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
            Data
          </label>
          <input
            id="memory-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="glass-panel w-full rounded-2xl px-4 py-3 text-sm text-lumia-ink outline-none"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">Categoria</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                emoji={option.emoji}
                selected={category === option.value}
                onClick={() => setCategory(option.value)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }}>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">Sentimento</p>
          <div className="flex flex-wrap gap-2">
            {FEELING_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                emoji={option.emoji}
                selected={feeling === option.value}
                onClick={() => setFeeling(option.value)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
            Fotos, vídeos e áudios
          </p>
          <MediaPicker onAdd={(item) => setMedia((current) => [...current, item])} />
          <div className="mt-3">
            <MediaGallery media={media} onRemove={handleRemoveMedia} />
          </div>
        </motion.div>

        <div className="mt-2 pb-2">
          <Button type="submit" className="w-full" loading={isSaving}>
            {isSaving ? "Guardando..." : editingMemory ? "Salvar alterações" : "Guardar memória"}
          </Button>
        </div>
      </form>
    </div>
  );
}
