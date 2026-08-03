/**
 * Lumia Design System — Typography
 *
 * Fonte de destaque (display) usada em logo/títulos: transmite
 * elegância e emoção. Fonte de corpo: legível, moderna, discreta.
 */

export const fontFamily = {
  display: "'Fraunces', 'Georgia', serif",
  body: "'Manrope', 'Helvetica Neue', sans-serif",
};

export const typography = {
  display: {
    fontFamily: fontFamily.display,
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },
  h1: {
    fontFamily: fontFamily.display,
    fontSize: "32px",
    lineHeight: "38px",
    fontWeight: 600,
  },
  h2: {
    fontFamily: fontFamily.display,
    fontSize: "24px",
    lineHeight: "30px",
    fontWeight: 600,
  },
  h3: {
    fontFamily: fontFamily.body,
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 700,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: "15px",
    lineHeight: "22px",
    fontWeight: 400,
  },
  caption: {
    fontFamily: fontFamily.body,
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: 500,
  },
  label: {
    fontFamily: fontFamily.body,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
} as const;
