import { History } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { EmptyState } from "../components/ui/EmptyState";

/**
 * Tela Timeline — futura linha do tempo cronológica das memórias.
 * Por enquanto, apenas o estado vazio elegante.
 */
export function TimelineScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow="Sua jornada"
        title="Linha do tempo"
        subtitle="Cada memória, um instante guardado no tempo."
      />
      <EmptyState
        icon={<History size={26} />}
        title="Sua linha do tempo está esperando"
        description="O primeiro momento que você guardar vai marcar o início da sua história aqui."
      />
    </div>
  );
}
