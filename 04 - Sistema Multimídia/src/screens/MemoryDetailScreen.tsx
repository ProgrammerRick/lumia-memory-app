import { motion } from "framer-motion";
import { ArrowLeft, ImageOff, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CategoryBadge, FeelingBadge } from "../components/memories/MemoryBadges";
import { useNavigation } from "../context/NavigationContext";
import { useMemories } from "../context/MemoriesContext";
import { useToast } from "../context/ToastContext";
import { formatMemoryDate } from "../utils/date";

/**
 * Tela de detalhe de uma memória.
 *
 * Aberta a partir de um cartão na Home ou na Timeline. Mostra a experiência
 * completa do momento guardado (imagem, título, texto, data, categoria e
 * sentimento) e concentra as ações de editar e excluir com segurança.
 */
export function MemoryDetailScreen() {
  const { params, goBack, navigate } = useNavigation();
  const { getMemory, deleteMemory } = useMemories();
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const memory = params.memoryId ? getMemory(params.memoryId) : undefined;

  if (!memory) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-[15px] text-lumia-ink-muted">Esta memória não foi encontrada.</p>
        <button onClick={() => navigate("home")} className="text-[13.5px] font-medium text-lumia-gold">
          Voltar para o início
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMemory(memory.id);
    setConfirmOpen(false);
    showToast("Memória apagada", "delete");
    navigate("home");
  };

  return (
    <div className="relative flex h-full flex-col overflow-y-auto">
      <div className="relative h-72 w-full shrink-0 overflow-hidden bg-lumia-surface">
        {memory.coverImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={memory.coverImage}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lumia-ink-faint">
            <ImageOff size={32} strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-lumia-bg via-lumia-bg/10 to-lumia-void/40" />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <IconButton onClick={goBack} aria-label="Voltar" className="glass-panel-strong">
            <ArrowLeft size={18} />
          </IconButton>
          <div className="flex gap-2">
            <IconButton
              onClick={() => navigate("create", { memoryId: memory.id })}
              aria-label="Editar memória"
              className="glass-panel-strong"
            >
              <Pencil size={17} />
            </IconButton>
            <IconButton
              onClick={() => setConfirmOpen(true)}
              aria-label="Excluir memória"
              className="glass-panel-strong hover:text-lumia-rose"
            >
              <Trash2 size={17} />
            </IconButton>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 flex-col gap-5 px-6 pb-10 pt-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={memory.category} />
          <FeelingBadge feeling={memory.feeling} />
        </div>

        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
            {formatMemoryDate(memory.date)}
          </p>
          <h1 className="font-serif text-[28px] leading-tight text-lumia-ink">{memory.title}</h1>
        </div>

        {memory.description && (
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-lumia-ink-muted">
            {memory.description}
          </p>
        )}
      </motion.div>

      <ConfirmDialog
        open={confirmOpen}
        title="Apagar esta memória?"
        description="Essa ação não pode ser desfeita. Este momento guardado será removido permanentemente do seu dispositivo."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
