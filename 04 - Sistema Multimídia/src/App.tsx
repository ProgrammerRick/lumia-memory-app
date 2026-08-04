import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";
import { MemoriesProvider } from "./context/MemoriesContext";
import { ToastProvider } from "./context/ToastContext";
import { AppShell } from "./components/layout/AppShell";
import { BottomNav } from "./components/layout/BottomNav";
import { ScreenTransition } from "./components/layout/ScreenTransition";
import { Logo } from "./components/ui/Logo";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CreateMemoryScreen } from "./screens/CreateMemoryScreen";
import { TimelineScreen } from "./screens/TimelineScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { MemoryDetailScreen } from "./screens/MemoryDetailScreen";

/**
 * Tela de carregamento inicial — um véu breve e elegante exibido apenas
 * ao abrir o app, reforçando a identidade de "luz se acendendo" antes de
 * revelar a experiência. Puramente visual, sem qualquer lógica de dados.
 */
function AppLoader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-lumia-bg"
    >
      <Logo size={56} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[11px] uppercase tracking-[0.4em] text-lumia-ink-faint"
      >
        Lumia
      </motion.p>
    </motion.div>
  );
}

function LumiaApp() {
  const { screen } = useNavigation();
  const showNav = screen !== "welcome" && screen !== "memory-detail";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AppShell>
      <div
        className={`relative flex h-full w-full flex-1 flex-col ${
          showNav ? "pb-[104px]" : ""
        }`}
      >
        <AnimatePresence mode="wait">
          {screen === "welcome" && (
            <ScreenTransition key="welcome">
              <WelcomeScreen />
            </ScreenTransition>
          )}
          {screen === "home" && (
            <ScreenTransition key="home">
              <HomeScreen />
            </ScreenTransition>
          )}
          {screen === "create" && (
            <ScreenTransition key="create">
              <CreateMemoryScreen />
            </ScreenTransition>
          )}
          {screen === "timeline" && (
            <ScreenTransition key="timeline">
              <TimelineScreen />
            </ScreenTransition>
          )}
          {screen === "settings" && (
            <ScreenTransition key="settings">
              <SettingsScreen />
            </ScreenTransition>
          )}
          {screen === "memory-detail" && (
            <ScreenTransition key="memory-detail">
              <MemoryDetailScreen />
            </ScreenTransition>
          )}
        </AnimatePresence>
      </div>
      {showNav && <BottomNav />}
      <AnimatePresence>{isLoading && <AppLoader />}</AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <MemoriesProvider>
        <ToastProvider>
          <LumiaApp />
        </ToastProvider>
      </MemoriesProvider>
    </NavigationProvider>
  );
}
