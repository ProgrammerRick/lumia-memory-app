/**
 * Utilitário de onboarding (Etapa 5 — Experiência de Uso e Interações).
 *
 * Guarda, localmente, se o usuário já viu a apresentação inicial do Lumia,
 * para que ela seja exibida apenas na primeira vez que o app é aberto.
 * Nenhum dado sai do dispositivo — apenas uma chave booleana em
 * `localStorage`, no mesmo espírito de privacidade já usado para as
 * memórias.
 */
export const LUMIA_ONBOARDING_KEY = "lumia:onboarding-completed";

export function hasCompletedOnboarding(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(LUMIA_ONBOARDING_KEY) === "true";
  } catch {
    return true;
  }
}

export function markOnboardingCompleted(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LUMIA_ONBOARDING_KEY, "true");
  } catch {
    // Armazenamento indisponível (ex.: modo privado) — não é crítico.
  }
}
