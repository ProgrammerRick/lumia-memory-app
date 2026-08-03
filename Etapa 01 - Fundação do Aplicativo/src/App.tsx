import { PhoneShell } from "./components/PhoneShell";
import { NavigationProvider } from "./navigation/NavigationContext";
import { AppNavigator } from "./navigation/AppNavigator";

/**
 * Lumia — Fundação do aplicativo mobile (v0.1)
 *
 * Este componente representa a raiz do app. `PhoneShell` é apenas a
 * moldura de pré-visualização usada nesta etapa (ver README/CHANGELOG
 * para detalhes sobre a limitação de tooling); todo o restante —
 * NavigationProvider, AppNavigator e as telas — é a aplicação real e
 * está pronto para ser transplantado para um projeto Expo/React
 * Native, trocando apenas a camada de apresentação (View/SafeAreaView
 * no lugar de <div>).
 */
export default function App() {
  return (
    <NavigationProvider>
      <PhoneShell>
        <AppNavigator />
      </PhoneShell>
    </NavigationProvider>
  );
}
