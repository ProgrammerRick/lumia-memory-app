/**
 * Lumia Design System — Colors
 *
 * Direção visual: premium, minimalista, emocional.
 * Paleta inspirada em céus de entardecer e luz de vela —
 * transmite nostalgia, aconchego e eternidade.
 */

export const colors = {
  // Fundos (tons profundos, "à noite", para destacar memórias como luz)
  background: {
    base: "#0E0A1A",
    elevated: "#161029",
    card: "#1D1633",
    overlay: "rgba(14, 10, 26, 0.72)",
  },

  // Gradiente de assinatura da marca Lumia
  gradient: {
    from: "#2C1A4D",
    via: "#5B3A7A",
    to: "#F2A65A",
  },

  // Acentos emocionais
  accent: {
    gold: "#F5C177",
    goldSoft: "#F7D9A3",
    coral: "#F2A65A",
    lavender: "#B9A6E0",
    rose: "#E8A0BF",
  },

  // Texto
  text: {
    primary: "#F8F4EE",
    secondary: "#C9C2DA",
    muted: "#8A83A0",
    inverse: "#1D1633",
  },

  // Estados / feedback
  state: {
    success: "#8FD3A5",
    warning: "#F2C265",
    danger: "#E8879A",
  },

  border: {
    subtle: "rgba(248, 244, 238, 0.08)",
    strong: "rgba(248, 244, 238, 0.16)",
    accent: "rgba(245, 193, 119, 0.35)",
  },
} as const;

export type LumiaColors = typeof colors;
