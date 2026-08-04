/**
 * Telas principais do aplicativo Lumia.
 *
 * "welcome" é a tela de entrada (splash/onboarding inicial).
 * As demais são as telas do app após o usuário entrar,
 * navegáveis pela barra de navegação inferior (BottomNav).
 */
export type AppScreen = "welcome" | "home" | "create" | "timeline" | "settings";

/**
 * Telas que possuem um item correspondente na navegação inferior.
 * "welcome" fica de fora propositalmente pois é uma tela de entrada única.
 */
export type TabScreen = Extract<AppScreen, "home" | "create" | "timeline" | "settings">;

export const TAB_SCREENS: TabScreen[] = ["home", "create", "timeline", "settings"];
