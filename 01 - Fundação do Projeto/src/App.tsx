import { AnimatePresence } from "framer-motion";
import { NavigationProvider, useNavigation } from "./context/NavigationContext";
import { AppShell } from "./components/layout/AppShell";
import { BottomNav } from "./components/layout/BottomNav";
import { ScreenTransition } from "./components/layout/ScreenTransition";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CreateMemoryScreen } from "./screens/CreateMemoryScreen";
import { TimelineScreen } from "./screens/TimelineScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

function LumiaApp() {
  const { screen } = useNavigation();
  const showNav = screen !== "welcome";

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
        </AnimatePresence>
      </div>
      {showNav && <BottomNav />}
    </AppShell>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <LumiaApp />
    </NavigationProvider>
  );
}
