import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AppScreen, NavigationParams } from "../types/navigation";

interface NavigationContextValue {
  /** Tela atualmente ativa. */
  screen: AppScreen;
  /** Tela ativa anteriormente — útil para decidir a direção das transições e para "voltar". */
  previousScreen: AppScreen | null;
  /** Parâmetros da navegação atual (ex.: id da memória aberta). */
  params: NavigationParams;
  /** Navega para uma nova tela, opcionalmente carregando parâmetros. */
  navigate: (screen: AppScreen, params?: NavigationParams) => void;
  /** Volta para a tela anterior, se existir; caso contrário vai para a Home. */
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

const INITIAL_SCREEN: AppScreen = "welcome";

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>(INITIAL_SCREEN);
  const [previousScreen, setPreviousScreen] = useState<AppScreen | null>(null);
  const [params, setParams] = useState<NavigationParams>({});

  const navigate = (next: AppScreen, nextParams: NavigationParams = {}) => {
    setScreen((current) => {
      if (current === next && screen === next) {
        setParams(nextParams);
        return current;
      }
      setPreviousScreen(current);
      return next;
    });
    setParams(nextParams);
  };

  const goBack = () => {
    navigate(previousScreen ?? "home");
  };

  const value = useMemo(
    () => ({ screen, previousScreen, params, navigate, goBack }),
    [screen, previousScreen, params]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation deve ser usado dentro de um NavigationProvider");
  }
  return ctx;
}
