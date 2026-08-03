export * from "./colors";
export * from "./typography";
export * from "./spacing";

import { colors } from "./colors";
import { typography, fontFamily } from "./typography";
import { spacing, radius, shadow } from "./spacing";

/**
 * Objeto único de tema — ponto central de acesso ao Design System do Lumia.
 * Pensado para futuramente alimentar diretamente um ThemeProvider do
 * React Native (ex.: styled-components/native ou tokens do Tamagui).
 */
export const theme = {
  colors,
  typography,
  fontFamily,
  spacing,
  radius,
  shadow,
};

export type LumiaTheme = typeof theme;
