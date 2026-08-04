/**
 * Utilitário mínimo para lembrar se a pessoa já viu o onboarding inicial.
 *
 * Guarda apenas uma flag booleana em `localStorage` — nenhum dado pessoal,
 * apenas um sinalizador de experiência já vista. Todo acesso ao
 * `localStorage` é protegido, já que ambientes sem suporte (ou em modo
 * privado) podem lançar exceções.
 */
const ONBOARDING_KEY = "lumia:onboarding-completed";

export function hasCompletedOnboarding(): boolean {
  try {
    return window.localStorage.getItem(ONBOARDING_KEY) === "true";
  } catch (error) {
    console.warn("Lumia: não foi possível ler o status do onboarding.", error);
    return false;
  }
}

export function markOnboardingCompleted(): void {
  try {
    window.localStorage.setItem(ONBOARDING_KEY, "true");
  } catch (error) {
    console.warn("Lumia: não foi possível salvar o status do onboarding.", error);
  }
}

export function resetOnboarding(): void {
  try {
    window.localStorage.removeItem(ONBOARDING_KEY);
  } catch (error) {
    console.warn("Lumia: não foi possível reiniciar o onboarding.", error);
  }
}
