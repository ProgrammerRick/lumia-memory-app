import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { Chip } from "../components/ui/Chip";
import { Button } from "../components/ui/Button";
import { ImagePicker } from "../components/ui/ImagePicker";
import { MediaPicker } from "../components/media/MediaPicker";
import { MediaGallery } from "../components/media/MediaGallery";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { useToast } from "../context/ToastContext";
import { todayIso } from "../utils/date";
import { CATEGORY_OPTIONS, FEELING_OPTIONS } from "../utils/memoryMeta";
import type { MediaItem, MemoryCategory, MemoryFeeling, MemoryInput } from "../types/memory";

interface FormState {
  title: string;
  description: string;
  date: string;
  category: MemoryCategory;
  feeling: MemoryFeeling;
  coverImage?: string;
  media: MediaItem[];
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  date: todayIso(),
  category: "cotidiano",
  feeling: "feliz",
  coverImage: undefined,
  media: [],
};

/**
 * Tela de criação de memória — reaproveitada também para edição quando a
 * navegação carrega `params.memoryId`.
 *
 * Desde a Etapa 4, além de título, descrição, data, categoria, sentimento e
 * imagem de capa, o formulário permite anexar múltiplas fotos, vídeos e
 * áudios através do `MediaPicker`/`MediaGallery`, mantendo toda a leitura de
 * arquivos isolada em `services/media/mediaService`.
 *
 * Na Etapa 5, o botão de salvar ganhou um estado de carregamento visível
 * (`loading`) e o feedback de sucesso passou a incluir um pequeno ícone de
 * confirmação — sem nenhuma mudança de layout, cor ou fluxo existente.
 */
export function CreateMemoryScreen() {
  const { params, navigate } = useNavigation();
  const { getMemory, createMemory, updateMemory } = useMemories();
  const { showToast } = useToast();

  const editingMemory = useMemo(
    () => (params.memoryId ? getMemory(params.memoryId) : undefined),
    [params.memoryId, getMemory]
  );
  const isEditing = Boolean(editingMemory);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [titleError, setTitleError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editingMemory) {
      setForm({
        title: editingMemory.title,
        description: editingMemory.description,
        date: editingMemory.date,
        category: editingMemory.category,
        feeling: editingMemory.feeling,
        coverImage: editingMemory.coverImage,
        media: editingMemory.media ?? [],
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setTitleError(false);
  }, [editingMemory]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMedia = (item: MediaItem) => {
    setForm((prev) => ({ ...prev, media: [...prev.media, item] }));
  };

  const handleRemoveMedia = (id: string) => {
    setForm((prev) => ({ ...prev, media: prev.media.filter((item) => item.id !== id) }));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setTitleError(true);
      return;
    }

    setIsSaving(true);
    const input: MemoryInput = {
      title: form.title,
      description: form.description,
      date: form.date,
      category: form.category,
      feeling: form.feeling,
      coverImage: form.coverImage,
      media: form.media,
    };

    await new Promise((resolve) => window.setTimeout(resolve, 350));

    if (isEditing && editingMemory) {
      updateMemory(editingMemory.id, input);
      showToast("Memória atualizada.");
      setIsSaving(false);
      navigate("memory-detail", { memoryId: editingMemory.id });
      return;
    }

    const created = createMemory(input);
    showToast("Memória guardada.");
    setIsSaving(false);
    setForm(EMPTY_FORM);
    navigate("memory-detail", { memoryId: created.id });
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow={isEditing ? "Editar momento" : "Novo momento"}
        title={isEditing ? "Editar memória" : "Criar memória"}
        subtitle={
          isEditing
            ? "Ajuste os detalhes deste momento guardado."
            : "Escolha como você quer guardar este instante."
        }
      />

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pb-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <ImagePicker value={form.coverImage} onChange={(value) => updateField("coverImage", value)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col gap-2"
        >
          <label htmlFor="memory-title" className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Título
          </label>
          <GlassCard className="!rounded-2xl p-0">
            <input
              id="memory-title"
              value={form.title}
              onChange={(event) => {
                updateField("title", event.target.value);
                if (event.target.value.trim()) setTitleError(false);
              }}
              placeholder="Um nome para este momento"
              aria-invalid={titleError || undefined}
              className="w-full bg-transparent px-4 py-3.5 text-[15px] text-lumia-ink placeholder:text-lumia-ink-faint focus:outline-none"
            />
          </GlassCard>
          {titleError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="px-1 text-[12px] text-lumia-rose"
            >
              Dê um título para guardar esta memória.
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <label htmlFor="memory-description" className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Descrição
          </label>
          <GlassCard className="!rounded-2xl p-0">
            <textarea
              id="memory-description"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Conte um pouco sobre esse momento..."
              rows={4}
              className="w-full resize-none bg-transparent px-4 py-3.5 text-[15px] leading-relaxed text-lumia-ink placeholder:text-lumia-ink-faint focus:outline-none"
            />
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col gap-2"
        >
          <label htmlFor="memory-date" className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Data
          </label>
          <GlassCard className="!rounded-2xl p-0">
            <input
              id="memory-date"
              type="date"
              value={form.date}
              onChange={(event) => updateField("date", event.target.value)}
              className="w-full bg-transparent px-4 py-3.5 text-[15px] text-lumia-ink focus:outline-none"
            />
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-2.5"
        >
          <p className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Categoria
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORY_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <Chip
                  key={option.value}
                  label={option.label}
                  icon={<Icon size={14} strokeWidth={2} />}
                  selected={form.category === option.value}
                  onClick={() => updateField("category", option.value)}
                />
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col gap-2.5"
        >
          <p className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Sentimento
          </p>
          <div className="flex flex-wrap gap-2.5">
            {FEELING_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                icon={<span aria-hidden>{option.emoji}</span>}
                selected={form.feeling === option.value}
                onClick={() => updateField("feeling", option.value)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col gap-2.5"
        >
          <p className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Fotos, vídeos e áudios
          </p>
          <MediaPicker onAdd={handleAddMedia} />
          <MediaGallery media={form.media} onRemove={handleRemoveMedia} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="pt-2"
        >
          <Button
            variant="primary"
            fullWidth
            loading={isSaving}
            icon={<Check size={17} />}
            onClick={() => void handleSave()}
          >
            {isSaving ? "Guardando..." : isEditing ? "Salvar alterações" : "Guardar memória"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
