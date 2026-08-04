import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { Chip } from "../components/ui/Chip";
import { Button } from "../components/ui/Button";
import { ImagePicker } from "../components/ui/ImagePicker";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { useToast } from "../context/ToastContext";
import { CATEGORY_OPTIONS, FEELING_OPTIONS } from "../utils/memoryMeta";
import { todayIso } from "../utils/date";
import type { MemoryCategory, MemoryFeeling } from "../types/memory";

interface FormState {
  title: string;
  description: string;
  date: string;
  category: MemoryCategory;
  feeling: MemoryFeeling;
  coverImage?: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  date: todayIso(),
  category: "cotidiano",
  feeling: "feliz",
  coverImage: undefined,
};

/**
 * Tela Criar/Editar Memória.
 *
 * Quando aberta com `params.memoryId`, funciona no modo de edição:
 * pré-carrega os dados da memória existente e salva as alterações em vez
 * de criar um novo registro.
 */
export function CreateMemoryScreen() {
  const { params, navigate } = useNavigation();
  const { createMemory, updateMemory, getMemory } = useMemories();
  const { showToast } = useToast();

  const editingId = params.memoryId;
  const editingMemory = editingId ? getMemory(editingId) : undefined;
  const isEditing = Boolean(editingMemory);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (editingMemory) {
      setForm({
        title: editingMemory.title,
        description: editingMemory.description,
        date: editingMemory.date,
        category: editingMemory.category,
        feeling: editingMemory.feeling,
        coverImage: editingMemory.coverImage,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingMemory?.id]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    setIsSaving(true);

    window.setTimeout(() => {
      if (isEditing && editingMemory) {
        updateMemory(editingMemory.id, form);
        setIsSaving(false);
        showToast("Memória atualizada");
        navigate("memory-detail", { memoryId: editingMemory.id });
      } else {
        const created = createMemory(form);
        setIsSaving(false);
        setForm(EMPTY_FORM);
        showToast("Memória guardada com carinho");
        navigate("memory-detail", { memoryId: created.id });
      }
    }, 450);
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
          <ImagePicker
            value={form.coverImage}
            onChange={(value) => updateField("coverImage", value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col gap-2"
        >
          <label className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Título
          </label>
          <GlassCard className="!rounded-2xl p-0">
            <input
              value={form.title}
              onChange={(event) => {
                updateField("title", event.target.value);
                if (event.target.value.trim()) setTitleError(false);
              }}
              placeholder="Um nome para este momento"
              className="w-full bg-transparent px-4 py-3.5 text-[15px] text-lumia-ink placeholder:text-lumia-ink-faint focus:outline-none"
            />
          </GlassCard>
          {titleError && (
            <p className="px-1 text-[12px] text-lumia-rose">Dê um título para guardar esta memória.</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-2"
        >
          <label className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Descrição
          </label>
          <GlassCard className="!rounded-2xl p-0">
            <textarea
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Conte com calma o que aconteceu..."
              rows={4}
              className="w-full resize-none bg-transparent px-4 py-3.5 text-[14.5px] leading-relaxed text-lumia-ink placeholder:text-lumia-ink-faint focus:outline-none"
            />
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col gap-2"
        >
          <label className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Data
          </label>
          <GlassCard className="!rounded-2xl p-0">
            <input
              type="date"
              value={form.date}
              max={todayIso()}
              onChange={(event) => updateField("date", event.target.value)}
              className="w-full bg-transparent px-4 py-3.5 text-[15px] text-lumia-ink focus:outline-none [color-scheme:dark]"
            />
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-2.5"
        >
          <label className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORY_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                icon={<option.icon size={14} strokeWidth={2} />}
                selected={form.category === option.value}
                onClick={() => updateField("category", option.value)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col gap-2.5"
        >
          <label className="px-1 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            Sentimento
          </label>
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
          className="mt-2"
        >
          <Button
            variant="primary"
            fullWidth
            disabled={isSaving}
            icon={isSaving ? <Sparkles size={17} className="animate-pulse" /> : <Check size={17} />}
            onClick={handleSave}
          >
            {isSaving ? "Guardando..." : isEditing ? "Salvar alterações" : "Guardar memória"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
