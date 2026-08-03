/**
 * Tipos de navegação — modelados propositalmente próximos ao formato
 * usado por bibliotecas como React Navigation (Expo), para facilitar
 * a migração futura do shell web para React Native.
 */

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Timeline: undefined;
  CreateMemory: undefined;
  Settings: undefined;
};

export type AppRoute = keyof MainTabParamList;
