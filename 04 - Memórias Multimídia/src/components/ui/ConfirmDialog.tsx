import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          onClick={onCancel}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-surface-elevated border border-white/[0.08] rounded-3xl p-6 w-full max-w-sm shadow-elevated"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                variant === 'danger' ? 'bg-red-500/10' : 'bg-amber-500/10'
              }`}>
                <AlertTriangle className={`w-7 h-7 ${
                  variant === 'danger' ? 'text-red-400' : 'text-amber-400'
                }`} />
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                {message}
              </p>

              <div className="flex gap-3 w-full">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={onCancel}
                >
                  {cancelLabel}
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  fullWidth
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
