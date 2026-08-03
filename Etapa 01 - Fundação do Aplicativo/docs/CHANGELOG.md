# Changelog Lumia

## Versão 0.1

Projeto iniciado.

### Decisões:

- Aplicativo focado em memórias
- Prioridade para experiência emocional
- Desenvolvimento por etapas

---

## Versão 0.1.0 — Fundação do aplicativo

Primeira fundação funcional do Lumia: identidade visual, estrutura
profissional de pastas, navegação inicial e armazenamento local
preparado, sem login, sem backend e sem dependências externas.

### Nota técnica importante sobre esta etapa

A tecnologia planejada e recomendada para o Lumia é **React Native +
Expo + TypeScript** (justificativa abaixo). Esta implementação, no
entanto, foi produzida dentro de um ambiente de execução que só
suporta build web (React + Vite + TypeScript + Tailwind, saída em
`dist/index.html`), sem acesso a toolchain do Expo, emuladores Android
ou geração de pacotes instaláveis.

Para não bloquear o progresso do projeto, esta versão foi construída
como um **shell de aplicativo mobile** (proporção de tela de
smartphone, notch, home indicator, tab bar inferior, sem elementos de
"site") com uma arquitetura de código **desenhada para migrar
diretamente para Expo/React Native** nos próximos passos:

- Toda a lógica (services, storage, hooks, types, animações, tema) é
  independente de HTML/DOM e pode ser reaproveitada quase sem
  alterações.
- As telas usam nomes e padrões (`onPress`, navegação por rotas
  nomeadas) equivalentes aos usados no React Native / React
  Navigation.
- A única camada que precisará ser reescrita ao migrar é a de
  apresentação (trocar `<div>`/CSS por `View`/`StyleSheet` ou
  NativeWind, e `localStorage` por `AsyncStorage`), graças à interface
  `StorageAdapter`.

### Por que React Native + Expo (decisão de arquitetura para o produto)

- **Performance/estabilidade**: compila para código nativo, com
  acesso a APIs de câmera, galeria e armazenamento local sem
  dependências pesadas.
- **Animações suaves**: ecossistema maduro (`react-native-reanimated`,
  `moti`) alinhado à proposta emocional/premium do Design System.
- **Manutenção simples**: um único código-fonte para Android e iOS,
  com Expo simplificando build, OTA updates e publicação na Play
  Store.
- **Crescimento futuro**: fácil adição de `expo-file-system`/SQLite
  para storage local robusto, e posteriormente contas, backup em
  nuvem e plano premium, sem reescrever a base.

### Estrutura adicionada

```
src/
  theme/          -> cores, tipografia, espaçamentos do Design System
  types/          -> Memory, navegação (tipados)
  utils/          -> geração de id, formatação de datas em pt-BR
  storage/        -> StorageAdapter (contrato) + implementação local
  services/       -> memoryService, onboardingService (regras de negócio)
  hooks/          -> useMemories, useOnboarding
  animations/     -> variantes de animação reutilizáveis
  navigation/     -> NavigationContext, AppNavigator, MainNavigator, BottomTabBar
  components/     -> Logo, PrimaryButton, ScreenContainer, MemoryCard,
                     EmptyState, PhoneShell
  screens/        -> SplashScreen, WelcomeScreen, HomeScreen,
                     TimelineScreen, CreateMemoryScreen, SettingsScreen
```

### Funcionalidades desta versão

- Tela de abertura (Splash) com animação da marca Lumia.
- Tela de boas-vindas com frase emocional e CTA "Começar minha
  história" (substitui login/cadastro — não implementados de
  propósito).
- Navegação por abas: Início, Linha do tempo, Criar memória, Ajustes.
- Criação de memórias (título, descrição, data, foto opcional, cor de
  destaque), guardadas **apenas localmente**.
- Linha do tempo com memórias agrupadas por ano.
- Tela de Ajustes com seções "Em breve" (conta, backup na nuvem,
  Premium) deixando a estrutura visível para o roadmap, sem
  implementar nada disso agora.

### Fora do escopo desta versão (propositalmente)

Login, cadastro, autenticação, banco de dados online, backend,
Firebase/Supabase, APIs externas e pagamentos — conforme regra do
projeto.

### Próximos passos sugeridos

1. Migrar o shell atual para um projeto Expo real (`npx create-expo-app`),
   reaproveitando `theme/`, `types/`, `utils/`, `storage/`, `services/`,
   `hooks/` quase sem alterações.
2. Trocar `localStorageAdapter` por um adapter com `AsyncStorage`
   (ou SQLite via `expo-sqlite`) mantendo a interface `StorageAdapter`.
3. Adicionar seleção real de fotos com `expo-image-picker` e
   armazenamento de arquivos com `expo-file-system`.
4. Implementar animações nativas com `react-native-reanimated`.
5. Configurar `app.json`/EAS Build para gerar o pacote Android
   (Play Store).
6. Somente depois disso: avaliar conta de usuário, backup em nuvem e
   plano Premium, mantendo a base offline como padrão gratuito.
