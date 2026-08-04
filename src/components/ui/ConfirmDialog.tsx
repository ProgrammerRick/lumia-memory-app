import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Diálogo de confirmação segura, usado principalmente para exclusão de memórias. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-6 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onCancel}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="glass-panel-strong w-full max-w-sm rounded-3xl p-6 text-center shadow-[var(--shadow-lumia-soft)]"
          >
            <h2 className="font-serif text-xl text-lumia-ink">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-lumia-ink-muted">{description}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button variant="danger" onClick={onConfirm} loading={loading}>
                {loading ? "Excluindo..." : confirmLabel}
              </Button>
              <Button variant="ghost" onClick={onCancel} disabled={loading}>
                {cancelLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
