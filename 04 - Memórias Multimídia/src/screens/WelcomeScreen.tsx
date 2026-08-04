import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LumiaLogo, LumiaWordmark } from '@/components/brand/LumiaLogo';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<'splash' | 'welcome'>('splash');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('welcome'), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-night-950 flex items-center justify-center overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,170,62,0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'splash' ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            >
              <LumiaLogo size="xl" animated={false} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <LumiaWordmark size="lg" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-text-muted text-sm tracking-widest uppercase"
            >
              Suas memórias, para sempre
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center px-8 max-w-md text-center"
          >
            {/* Decorative elements */}
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <LumiaLogo size="lg" />
              </motion.div>
              
              {/* Floating sparkle */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [-3, 3, -3], rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-5 h-5 text-lumia-400/60" />
              </motion.div>
            </div>

            {/* Welcome text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-2xl font-display font-bold text-text-primary mb-3">
                Bem-vindo ao{' '}
                <span className="text-gradient-lumia">Lumia</span>
              </h1>
              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                Um espaço seguro e bonito para guardar suas memórias mais
                preciosas. Reviva seus melhores momentos sempre que quiser.
              </p>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 mb-10"
            >
              {[
                { emoji: '📸', label: 'Fotos' },
                { emoji: '✍️', label: 'Histórias' },
                { emoji: '💫', label: 'Momentos' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <span className="text-[11px] text-text-muted font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onComplete}
                icon={<Sparkles className="w-5 h-5" />}
              >
                Começar a guardar memórias
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
