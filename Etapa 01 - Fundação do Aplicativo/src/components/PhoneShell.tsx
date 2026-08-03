import type { ReactNode } from "react";

interface PhoneShellProps {
  children: ReactNode;
}

/**
 * Moldura de dispositivo usada apenas para a pré-visualização em
 * navegador desta fundação. Simula proporção, notch e home-indicator
 * de um smartphone real, para que a experiência não pareça "um site".
 *
 * Isso é puramente de apresentação: toda a lógica do app (telas,
 * navegação, storage) é independente desta moldura e pode ser
 * renderizada diretamente em tela cheia num app Expo/React Native.
 */
export function PhoneShell({ children }: PhoneShellProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#070512] p-4">
      <div className="relative">
        <div className="relative h-[812px] w-[375px] max-h-[92vh] overflow-hidden rounded-[52px] border-[10px] border-[#221a35] bg-[#0E0A1A] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-30 h-7 w-36 -translate-x-1/2 rounded-b-2xl bg-[#221a35]" />
          {/* Screen content */}
          <div className="relative h-full w-full">{children}</div>
          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-1 w-32 -translate-x-1/2 rounded-full bg-white/25" />
        </div>
      </div>
    </div>
  );
}
