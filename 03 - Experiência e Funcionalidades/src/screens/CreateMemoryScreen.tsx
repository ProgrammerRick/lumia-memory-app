import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Image, MapPin, Calendar, Smile, X, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animated/FadeIn';
import { cn } from '@/utils/cn';

const moods = [
  { id: 'happy', emoji: '😊', label: 'Feliz', color: 'bg-amber-500/10 border-amber-500/20' },
  { id: 'love', emoji: '❤️', label: 'Amor', color: 'bg-rose-500/10 border-rose-500/20' },
  { id: 'calm', emoji: '😌', label: 'Calmo', color: 'bg-sky-500/10 border-sky-500/20' },
  { id: 'adventure', emoji: '🤩', label: 'Aventura', color: 'bg-emerald-500/10 border-emerald-500/20' },
  { id: 'nostalgic', emoji: '🥹', label: 'Nostálgico', color: 'bg-violet-500/10 border-violet-500/20' },
  { id: 'grateful', emoji: '🙏', label: 'Grato', color: 'bg-lumia-500/10 border-lumia-500/20' },
];

export function CreateMemoryScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Container>
      <Header
        title="Nova Memória"
        leftAction={
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        }
        transparent
      />

      <div className="mt-4 space-y-6">
        {/* Title Input */}
        <FadeIn delay={0.1}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-2 block uppercase tracking-wider">
              Título
            </label>
            <input
              type="text"
              placeholder="Dê um nome a esta memória..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-elevated border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-lumia-500/40 focus:ring-1 focus:ring-lumia-500/20 transition-all"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px' }}
            />
          </div>
        </FadeIn>

        {/* Photo Area */}
        <FadeIn delay={0.2}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-2 block uppercase tracking-wider">
              Foto
            </label>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative rounded-2xl border-2 border-dashed border-white/10 bg-surface-card hover:border-lumia-500/30 hover:bg-lumia-500/5 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-white/[0.08] flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6 text-text-muted" />
                </div>
                <p className="text-sm font-medium text-text-secondary">
                  Adicionar foto
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Toque para escolher ou tirar uma foto
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex border-t border-white/[0.06]">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 text-xs text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer">
                  <Camera className="w-4 h-4" />
                  Câmera
                </button>
                <div className="w-px bg-white/[0.06]" />
                <button className="flex-1 flex items-center justify-center gap-2 py-3 text-xs text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer">
                  <Image className="w-4 h-4" />
                  Galeria
                </button>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.3}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-2 block uppercase tracking-wider">
              Sua história
            </label>
            <textarea
              placeholder="Conte sobre esse momento..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-surface-elevated border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-lumia-500/40 focus:ring-1 focus:ring-lumia-500/20 transition-all resize-none leading-relaxed"
            />
          </div>
        </FadeIn>

        {/* Mood Selector */}
        <FadeIn delay={0.4}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-3 block uppercase tracking-wider">
              <Smile className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              Como você se sente?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood.id === selectedMood ? null : mood.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all duration-200 cursor-pointer',
                    mood.id === selectedMood
                      ? cn(mood.color, 'scale-[1.02]')
                      : 'bg-surface-card border-white/[0.04] hover:border-white/[0.1]'
                  )}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-[11px] text-text-muted">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Meta info */}
        <FadeIn delay={0.5}>
          <Card variant="glass" padding="none">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.04] cursor-pointer hover:bg-white/[0.02] transition-colors">
              <Calendar className="w-4 h-4 text-text-muted" />
              <span className="flex-1 text-sm text-text-secondary text-left">Data</span>
              <span className="text-xs text-text-muted">Hoje</span>
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-white/[0.02] transition-colors">
              <MapPin className="w-4 h-4 text-text-muted" />
              <span className="flex-1 text-sm text-text-secondary text-left">Local</span>
              <span className="text-xs text-text-muted">Adicionar</span>
              <ChevronDown className="w-4 h-4 text-text-muted" />
            </button>
          </Card>
        </FadeIn>

        {/* Save Button */}
        <FadeIn delay={0.6}>
          <div className="pt-2 pb-4">
            <Button variant="primary" size="lg" fullWidth>
              Salvar memória
            </Button>
          </div>
        </FadeIn>
      </div>
    </Container>
  );
}
