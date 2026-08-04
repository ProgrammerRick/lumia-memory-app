import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <Check className="w-4 h-4" />,
  error: <AlertCircle className="w-4 h-4" />,
  info: <Sparkles className="w-4 h-4" />,
};

const styles: Record<ToastType, string> = {
  success: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-300',
  error: 'bg-red-500/15 border-red-500/20 text-red-300',
  info: 'bg-lumia-500/15 border-lumia-500/20 text-lumia-300',
};

export function Toast({
  isVisible,
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-[calc(100%-40px)]"
        >
          <div
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl',
              styles[type]
            )}
          >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
