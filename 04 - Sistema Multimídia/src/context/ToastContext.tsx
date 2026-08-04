import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Trash2 } from "lucide-react";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastKind = "success" | "delete";

interface ToastState {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  /** Exibe um feedback breve e discreto no rodapé da tela. */
  showToast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const ICONS: Record<ToastKind, ReactNode> = {
  success: <CheckCircle2 size={16} className="text-lumia-gold" />,
  delete: <Trash2 size={16} className="text-lumia-rose" />,
};

/**
 * Provider de feedback leve ("toast") usado para confirmar visualmente
 * ações como salvar ou excluir uma memória, sem interromper o fluxo do
 * usuário com um alerta bloqueante.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, kind: ToastKind = "success") => {
    const id = Date.now();
    setToast({ id, message, kind });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none absolute inset-x-0 bottom-28 z-40 flex justify-center px-6">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel-strong pointer-events-auto flex items-center gap-2.5 rounded-full px-5 py-3 text-[13.5px] text-lumia-ink shadow-lumia-soft"
            >
              {ICONS[toast.kind]}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return ctx;
}
