import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AppScreen } from "../types/navigation";

interface NavigationContextValue {
  /** Tela atualmente ativa. */
  screen: AppScreen;
  /** Tela ativa anteriormente — útil para decidir a direção das transições. */
  previousScreen: AppScreen | null;
  /** Navega para uma nova tela. */
  navigate: (screen: AppScreen) => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

const INITIAL_SCREEN: AppScreen = "welcome";

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>(INITIAL_SCREEN);
  const [previousScreen, setPreviousScreen] = useState<AppScreen | null>(null);

  const navigate = (next: AppScreen) => {
    setScreen((current) => {
      if (current === next) return current;
      setPreviousScreen(current);
      return next;
    });
  };

  const value = useMemo(
    () => ({ screen, previousScreen, navigate }),
    [screen, previousScreen]
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
