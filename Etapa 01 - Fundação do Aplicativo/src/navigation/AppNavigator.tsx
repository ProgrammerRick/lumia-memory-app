import { AnimatePresence } from "framer-motion";
import { useNavigation } from "./NavigationContext";
import { SplashScreen } from "../screens/SplashScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { MainNavigator } from "./MainNavigator";

/**
 * Navegador raiz (Root Stack): Splash -> Welcome -> Main.
 */
export function AppNavigator() {
  const { rootRoute } = useNavigation();

  return (
    <AnimatePresence mode="wait">
      {rootRoute === "Splash" && <SplashScreen key="splash" />}
      {rootRoute === "Welcome" && <WelcomeScreen key="welcome" />}
      {rootRoute === "Main" && <MainNavigator key="main" />}
    </AnimatePresence>
  );
}
