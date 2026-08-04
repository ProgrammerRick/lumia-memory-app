import { ImageOff, Settings } from "lucide-react";
import { ScreenHeader } from "../components/ui/ScreenHeader";
import { EmptyState } from "../components/ui/EmptyState";
import { IconButton } from "../components/ui/IconButton";
import { useNavigation } from "../context/NavigationContext";

function useGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Boa madrugada";
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

/**
 * Tela Home — ponto de partida diário do usuário.
 * Nesta fase, apresenta apenas o estado vazio, já preparado para
 * futuramente exibir as memórias recentes e destaques.
 */
export function HomeScreen() {
  const greeting = useGreeting();
  const { navigate } = useNavigation();

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        eyebrow={greeting}
        title="Suas memórias"
        subtitle="Tudo o que você guardar vai aparecer aqui."
        action={
          <IconButton onClick={() => navigate("settings")} aria-label="Ajustes">
            <Settings size={19} />
          </IconButton>
        }
      />
      <EmptyState
        icon={<ImageOff size={26} />}
        title="Ainda não há memórias"
        description="Quando você criar sua primeira memória, ela vai brilhar bem aqui."
      />
    </div>
  );
}
