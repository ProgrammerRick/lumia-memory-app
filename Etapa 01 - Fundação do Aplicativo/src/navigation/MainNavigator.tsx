import { AnimatePresence } from "framer-motion";
import { useNavigation } from "./NavigationContext";
import { BottomTabBar } from "./BottomTabBar";
import { HomeScreen } from "../screens/HomeScreen";
import { TimelineScreen } from "../screens/TimelineScreen";
import { CreateMemoryScreen } from "../screens/CreateMemoryScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

/**
 * Navegador principal por abas (Home / Timeline / Criar / Ajustes).
 * Estrutura equivalente a um `Tab.Navigator` do React Navigation.
 */
export function MainNavigator() {
  const { activeTab } = useNavigation();

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {activeTab === "Home" && <HomeScreen key="home" />}
        {activeTab === "Timeline" && <TimelineScreen key="timeline" />}
        {activeTab === "CreateMemory" && <CreateMemoryScreen key="create" />}
        {activeTab === "Settings" && <SettingsScreen key="settings" />}
      </AnimatePresence>
      <BottomTabBar />
    </div>
  );
}
