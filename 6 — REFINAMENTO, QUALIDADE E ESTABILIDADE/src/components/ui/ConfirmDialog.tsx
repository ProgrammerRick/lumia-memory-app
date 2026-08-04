import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Diálogo de confirmação genérico — usado para exclusões seguras
 * (ex.: apagar uma memória ou um item de mídia) em qualquer tela do app.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="alertdialog"
          aria-modal="true"
          aria-label={title}
          className="absolute inset-0 z-50 flex items-end justify-center bg-lumia-void/70 backdrop-blur-sm md:items-center"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="glass-panel-strong mx-6 mb-6 w-full max-w-[340px] rounded-3xl p-6 text-center shadow-lumia-soft md:mb-0"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-lumia-rose/15 text-lumia-rose">
              <AlertTriangle size={22} strokeWidth={2} />
            </div>
            <h3 className="font-serif text-[20px] text-lumia-ink">{title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-lumia-ink-muted">
              {description}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="danger" fullWidth onClick={onConfirm}>
                {confirmLabel}
              </Button>
              <Button variant="ghost" fullWidth onClick={onCancel} autoFocus>
                {cancelLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
