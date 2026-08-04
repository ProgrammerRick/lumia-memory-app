import type { ReactNode } from "react";

/**
 * Moldura externa do app: fundo profundo, brilhos ambiente sutis e uma
 * "vitrine" central que se comporta como tela cheia no mobile e como um
 * cartão centralizado em telas grandes (desktop/tablet).
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-lumia-void">
      {/* Brilhos ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-lumia-gold/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-lumia-lavender/10 blur-[110px]"
      />

      <div className="relative flex h-full w-full max-w-[480px] flex-col overflow-hidden bg-lumia-bg sm:my-6 sm:h-[calc(100%-3rem)] sm:rounded-[2.5rem] sm:border sm:border-white/[0.06] sm:shadow-[var(--shadow-lumia-soft)]">
        {/* Textura de grão sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative flex h-full w-full flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
