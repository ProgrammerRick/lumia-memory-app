import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../components/ui/IconButton";
import { GlassCard } from "../components/ui/GlassCard";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CategoryBadge, FeelingBadge } from "../components/memories/MemoryBadges";
import { MediaGallery } from "../components/media/MediaGallery";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "../context/NavigationContext";
import { useToast } from "../context/ToastContext";
import { formatMemoryDate } from "../utils/date";

/** Visualização completa de uma memória, com edição e exclusão seguras. */
export function MemoryDetailScreen() {
  const { params, navigate } = useNavigation();
  const { getMemory, deleteMemory } = useMemories();
  const { showToast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const memory = params.memoryId ? getMemory(params.memoryId) : undefined;

  if (!memory) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm text-lumia-ink-muted">Esta memória não foi encontrada.</p>
        <IconButton aria-label="Voltar para o início" onClick={() => navigate("home")}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </IconButton>
      </div>
    );
  }

  async function handleDelete() {
    if (!memory) return;
    setIsDeleting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 350));
    deleteMemory(memory.id);
    setIsDeleting(false);
    setConfirmOpen(false);
    showToast("Memória excluída.", "delete");
    navigate("home");
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto pb-6">
      <div className="relative">
        <div className="h-56 w-full overflow-hidden bg-white/[0.06]">
          {memory.coverImage ? (
            <img src={memory.coverImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl text-lumia-ink-faint">✦</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-lumia-bg via-lumia-bg/10 to-transparent" />
        </div>

        <div className="absolute left-6 top-6 right-6 flex items-center justify-between">
          <IconButton aria-label="Voltar" onClick={() => navigate("home")}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </IconButton>
          <div className="flex gap-2">
            <IconButton aria-label="Editar memória" onClick={() => navigate("create", { memoryId: memory.id })}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
            </IconButton>
            <IconButton aria-label="Excluir memória" variant="glass" onClick={() => setConfirmOpen(true)}>
              <Trash2 className="h-4 w-4 text-lumia-rose" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 pt-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-lumia-ink-faint">
            {formatMemoryDate(memory.date)}
          </p>
          <h1 className="mt-1 font-serif text-2xl text-lumia-ink">{memory.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <CategoryBadge category={memory.category} />
            <FeelingBadge feeling={memory.feeling} />
          </div>
        </div>

        {memory.description && (
          <GlassCard>
            <p className="text-sm leading-relaxed text-lumia-ink-muted">{memory.description}</p>
          </GlassCard>
        )}

        {memory.media && memory.media.length > 0 && (
          <div>
            <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-lumia-ink-faint">
              Mídia guardada
            </h2>
            <MediaGallery media={memory.media} />
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir esta memória?"
        description="Essa ação não pode ser desfeita. Esta memória será apagada permanentemente deste dispositivo."
        confirmLabel="Excluir"
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
