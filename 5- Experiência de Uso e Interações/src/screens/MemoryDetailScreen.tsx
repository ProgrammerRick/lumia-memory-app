import { motion } from "framer-motion";
import { ArrowLeft, ImageOff, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CategoryBadge, FeelingBadge } from "../components/memories/MemoryBadges";
import { MediaGallery } from "../components/media/MediaGallery";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { useToast } from "../context/ToastContext";
import { formatMemoryDate } from "../utils/date";

/**
 * Tela de detalhe de uma memória: capa em destaque, título, data,
 * categoria, sentimento, descrição e — desde a Etapa 4 — a galeria de
 * fotos, vídeos e áudios anexados. Permite editar (reaproveitando a tela
 * "create") e excluir, com confirmação segura via `ConfirmDialog`.
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
        <Button variant="glass" onClick={goBack}>
          Voltar
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMemory(memory.id);
    setConfirmOpen(false);
    showToast("Memória excluída.", "delete");
    goBack();
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="relative h-72 w-full shrink-0 overflow-hidden bg-white/5">
        {memory.coverImage ? (
          <img src={memory.coverImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lumia-ink-faint">
            <ImageOff size={28} strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-lumia-bg via-lumia-bg/10 to-lumia-void/40" />

        <div className="absolute inset-x-5 top-[calc(env(safe-area-inset-top)+16px)] flex items-center justify-between">
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

      <div className="flex flex-1 flex-col gap-5 px-6 pb-10 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
            {formatMemoryDate(memory.date)}
          </p>
          <h1 className="mt-1 font-serif text-[26px] leading-tight text-lumia-ink">{memory.title}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2"
        >
          <CategoryBadge category={memory.category} />
          <FeelingBadge feeling={memory.feeling} />
        </motion.div>

        {memory.description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] leading-relaxed text-lumia-ink-muted"
          >
            {memory.description}
          </motion.p>
        )}

        {memory.media && memory.media.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2.5"
          >
            <p className="px-0.5 text-[12px] font-medium uppercase tracking-[0.15em] text-lumia-ink-faint">
              Fotos, vídeos e áudios
            </p>
            <MediaGallery media={memory.media} />
          </motion.div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir esta memória?"
        description="Essa ação não pode ser desfeita. A memória e tudo o que está guardado nela serão apagados."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
