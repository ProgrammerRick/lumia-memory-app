import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LumiaLogo, LumiaWordmark } from '@/components/brand/LumiaLogo';
import { Button } from '@/components/ui/Button';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<'splash' | 'welcome'>('splash');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('welcome'), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-night-950 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,170,62,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(255,170,62,0.04) 50%, transparent 70%)',
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'splash' ? (
          <motion.div
            key="splash"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center min-h-screen"
          >
            {/* Logo entrance */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              } as any}
            >
              <LumiaLogo size="xl" animated={false} />
            </motion.div>

            {/* Wordmark entrance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6"
            >
              <LumiaWordmark size="lg" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-3 text-sm text-text-muted tracking-wide"
            >
              Guarde seus momentos
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col min-h-screen px-6"
          >
            {/* Top area with image */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {/* Decorative circles */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 } as any}
                className="relative mb-8"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-lumia-500/30 shadow-glow-md">
                  <img
                    src="/images/hero-memories.jpg"
                    alt="Memórias"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating sparkle */}
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-lumia-400 to-lumia-500 flex items-center justify-center shadow-glow-sm"
                >
                  <Sparkles className="w-4 h-4 text-night-950" />
                </motion.div>
              </motion.div>

              {/* Welcome text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center max-w-sm"
              >
                <h1
                  className="text-3xl font-bold text-text-primary mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Bem-vindo ao{' '}
                  <span className="text-gradient-lumia">Lumia</span>
                </h1>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Um espaço seguro e bonito para guardar suas memórias mais
                  preciosas. Reviva seus melhores momentos sempre que quiser.
                </p>
              </motion.div>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 flex gap-6"
              >
                {[
                  { emoji: '📸', label: 'Fotos' },
                  { emoji: '✍️', label: 'Histórias' },
                  { emoji: '💫', label: 'Momentos' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center text-xl">
                      {item.emoji}
                    </div>
                    <span className="text-[11px] text-text-muted">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="pb-12 pt-6"
            >
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onComplete}
                iconRight={<ArrowRight className="w-5 h-5" />}
              >
                Começar
              </Button>
              <p className="text-center text-[11px] text-text-muted mt-4">
                Suas memórias ficam salvas no seu dispositivo
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
