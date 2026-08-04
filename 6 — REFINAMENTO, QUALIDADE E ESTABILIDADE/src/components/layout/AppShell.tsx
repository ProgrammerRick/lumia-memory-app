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
          style={{
            backgroundImage:
              "radial-gradient(120% 60% at 50% -10%, rgba(255,255,255,0.05), rgba(255,255,255,0) 55%)",
          }}
        >
          {/* Friso de luz superior sutil, apenas na "vitrine" desktop */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent md:block" />

          {/* Textura de grão discreta para sensação nostálgica/filme */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 flex h-full w-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
