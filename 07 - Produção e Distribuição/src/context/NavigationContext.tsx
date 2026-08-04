import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AppScreen, NavigationParams } from "../types/navigation";

interface NavigationContextValue {
  screen: AppScreen;
  previousScreen: AppScreen | null;
  params: NavigationParams;
  navigate: (screen: AppScreen, params?: NavigationParams) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

/**
 * Sistema de navegação interno do Lumia (sem router de URL). Mantém a tela
 * atual, a anterior (para `goBack`) e parâmetros opcionais de navegação.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [previousScreen, setPreviousScreen] = useState<AppScreen | null>(null);
  const [params, setParams] = useState<NavigationParams>({});

  const navigate = useCallback(
    (nextScreen: AppScreen, nextParams: NavigationParams = {}) => {
      setPreviousScreen((current) => (current === nextScreen ? current : screen));
      setScreen(nextScreen);
      setParams(nextParams);
    },
    [screen],
  );

  const goBack = useCallback(() => {
    setScreen((current) => previousScreen ?? current);
    setParams({});
  }, [previousScreen]);

  const value = useMemo(
    () => ({ screen, previousScreen, params, navigate, goBack }),
    [screen, previousScreen, params, navigate, goBack],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation deve ser usado dentro de um NavigationProvider.");
  }
  return context;
}
