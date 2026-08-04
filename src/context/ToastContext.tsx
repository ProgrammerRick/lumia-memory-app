import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ImagePlus, Trash2, AlertCircle } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type ToastKind = "success" | "delete" | "media" | "error";

interface ToastState {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  showToast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONS: Record<ToastKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  delete: Trash2,
  media: ImagePlus,
  error: AlertCircle,
};

/** Feedback discreto e não-intrusivo para ações do usuário (salvar, excluir, mídia, erros). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timerRef = useRef<number | null>(null);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, kind: ToastKind = "success") => {
    idRef.current += 1;
    setToast({ id: idRef.current, message, kind });

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  const Icon = toast ? ICONS[toast.kind] : null;

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-6"
        aria-live="polite"
        role="status"
      >
        <AnimatePresence>
          {toast && Icon && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel-strong flex max-w-xs items-center gap-2 rounded-full px-4 py-3 text-sm text-lumia-ink shadow-[var(--shadow-lumia-soft)]"
            >
              <Icon className="h-4 w-4 shrink-0 text-lumia-gold" aria-hidden="true" />
              <span className="leading-snug">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider.");
  }
  return context;
}
