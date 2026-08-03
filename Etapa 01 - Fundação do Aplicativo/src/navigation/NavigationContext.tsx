import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppRoute, RootStackParamList } from "../types/navigation";

type RootRoute = keyof RootStackParamList;

interface NavigationState {
  /** Rota raiz atual: Splash, Welcome ou Main */
  rootRoute: RootRoute;
  /** Aba ativa dentro do stack "Main" */
  activeTab: AppRoute;
  goToRoot: (route: RootRoute) => void;
  navigate: (tab: AppRoute) => void;
}

/**
 * Navegador leve, escrito propositalmente com uma API parecida com a
 * do React Navigation (`navigate`, rotas nomeadas) para que, na
 * migração para Expo, apenas a implementação interna precise mudar —
 * as telas continuam chamando `useNavigation()` da mesma forma.
 */
const NavigationCtx = createContext<NavigationState | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [rootRoute, setRootRoute] = useState<RootRoute>("Splash");
  const [activeTab, setActiveTab] = useState<AppRoute>("Home");

  const goToRoot = useCallback((route: RootRoute) => setRootRoute(route), []);
  const navigate = useCallback((tab: AppRoute) => setActiveTab(tab), []);

  const value = useMemo(
    () => ({ rootRoute, activeTab, goToRoot, navigate }),
    [rootRoute, activeTab, goToRoot, navigate],
  );

  return (
    <NavigationCtx.Provider value={value}>{children}</NavigationCtx.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationCtx);
  if (!ctx) {
    throw new Error("useNavigation deve ser usado dentro de NavigationProvider");
  }
  return ctx;
}
