import type { ReactNode } from "react";

/**
 * Moldura raiz do aplicativo.
 *
 * Em telas maiores (desktop/tablet), o Lumia é apresentado dentro de uma
 * "vitrine" com formato de telefone para reforçar sua identidade de app
 * pessoal e íntimo. Em telas pequenas (celular real), ocupa 100% da viewport.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-lumia-void">
      {/* Glow ambiente de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(155,156,230,0.14) 0%, rgba(5,5,6,0) 60%), radial-gradient(50% 35% at 85% 100%, rgba(232,181,115,0.12) 0%, rgba(5,5,6,0) 60%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center md:p-8">
        <div
          className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-lumia-bg md:h-[850px] md:max-h-[92vh] md:w-[420px] md:rounded-[2.75rem] md:border md:border-white/10 md:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)]"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
