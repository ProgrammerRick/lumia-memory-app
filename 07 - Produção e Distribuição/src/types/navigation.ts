/**
 * Telas principais do aplicativo Lumia.
 *
 * "welcome" é a tela de entrada (splash inicial), "onboarding" é a
 * apresentação de primeira visita. As demais são as telas do app após o
 * usuário entrar.
 *
 * "memory-detail" é uma tela de destino (não aparece na navegação
 * inferior), aberta a partir de um cartão de memória na Home ou na
 * Timeline.
 */
export type AppScreen =
  | "welcome"
  | "onboarding"
  | "home"
  | "create"
  | "timeline"
  | "settings"
  | "memory-detail";

/**
 * Telas que possuem um item correspondente na navegação inferior.
 * "welcome", "onboarding" e "memory-detail" ficam de fora propositalmente.
 */
export type TabScreen = Extract<AppScreen, "home" | "create" | "timeline" | "settings">;

export const TAB_SCREENS: TabScreen[] = ["home", "create", "timeline", "settings"];

/**
 * Parâmetros opcionais que uma navegação pode carregar.
 *
 * Modelado de forma genérica para crescer sem quebrar a navegação
 * existente: hoje carrega apenas `memoryId` (usado por "memory-detail" e
 * pelo modo de edição da tela "create").
 */
export interface NavigationParams {
  memoryId?: string;
}
