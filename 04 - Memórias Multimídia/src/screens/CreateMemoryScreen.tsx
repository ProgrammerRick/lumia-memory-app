import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Smile, Tag, Palette, Check } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animated/FadeIn';
import { useMemories } from '@/contexts/MemoryContext';
import { moods, categories, memoryEmojis, memoryColors } from '@/lib/constants';
import { cn } from '@/utils/cn';
import type { MoodType, CategoryType, MemoryFormData } from '@/types/memory';

interface CreateMemoryScreenProps {
  onClose: () => void;
  onSuccess: () => void;
  editMemory?: {
    id: string;
    title: string;
    description: string;
    date: string;
    category: CategoryType;
    emoji: string;
    color: string;
    mood: MoodType;
    favorite: boolean;
  };
}

export function CreateMemoryScreen({ onClose, onSuccess, editMemory }: CreateMemoryScreenProps) {
  const { addMemory, editMemory: updateMemory } = useMemories();
  const isEditing = !!editMemory;

  const [title, setTitle] = useState(editMemory?.title || '');
  const [description, setDescription] = useState(editMemory?.description || '');
  const [date, setDate] = useState(
    editMemory?.date
      ? new Date(editMemory.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(editMemory?.mood || null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(editMemory?.category || null);
  const [selectedEmoji, setSelectedEmoji] = useState(editMemory?.emoji || '✨');
  const [selectedColor, setSelectedColor] = useState(editMemory?.color || '#FFAA3E');
  const [isFavorite, setIsFavorite] = useState(editMemory?.favorite || false);
  const [saving, setSaving] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const canSave = title.trim().length > 0 && selectedMood && selectedCategory;

  const handleSave = useCallback(async () => {
    if (!canSave) return;

    setSaving(true);
    
    // Small delay for premium feel
    await new Promise((r) => setTimeout(r, 400));

    const formData: MemoryFormData = {
      title: title.trim(),
      description: description.trim(),
      date: new Date(date).toISOString(),
      category: selectedCategory!,
      emoji: selectedEmoji,
      color: selectedColor,
      mood: selectedMood!,
      favorite: isFavorite,
    };

    if (isEditing && editMemory) {
      updateMemory(editMemory.id, formData);
    } else {
      addMemory(formData);
    }

    setSaving(false);
    onSuccess();
  }, [canSave, title, description, date, selectedMood, selectedCategory, selectedEmoji, selectedColor, isFavorite, isEditing, editMemory, addMemory, updateMemory, onSuccess]);

  return (
    <Container>
      <Header
        title={isEditing ? 'Editar Memória' : 'Nova Memória'}
        leftAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </motion.button>
        }
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer',
              isFavorite ? 'text-rose-400 bg-rose-500/10' : 'text-text-muted hover:text-text-primary hover:bg-white/5'
            )}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.button>
        }
        transparent
      />

      <div className="mt-2 space-y-6">
        {/* Emoji & Color Quick Selectors */}
        <FadeIn delay={0.05}>
          <div className="flex items-center gap-3">
            {/* Emoji selector */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowColorPicker(false); }}
              className="w-16 h-16 rounded-2xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center cursor-pointer hover:border-lumia-500/30 transition-all"
              style={{ background: `linear-gradient(135deg, ${selectedColor}22, ${selectedColor}11)` }}
            >
              <span className="text-3xl">{selectedEmoji}</span>
            </motion.button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowEmojiPicker(!showEmojiPicker); setShowColorPicker(false); }}
                  className="text-xs text-text-muted hover:text-lumia-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Smile className="w-3.5 h-3.5" />
                  Emoji
                </button>
                <span className="text-text-muted/30">·</span>
                <button
                  onClick={() => { setShowColorPicker(!showColorPicker); setShowEmojiPicker(false); }}
                  className="text-xs text-text-muted hover:text-lumia-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5" />
                  Cor
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface-elevated rounded-2xl border border-white/[0.06] p-3"
          >
            <div className="grid grid-cols-8 gap-2">
              {memoryEmojis.map((emoji) => (
                <motion.button
                  key={emoji}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => { setSelectedEmoji(emoji); setShowEmojiPicker(false); }}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all',
                    selectedEmoji === emoji ? 'bg-lumia-500/20 border border-lumia-500/40' : 'hover:bg-white/5'
                  )}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Color Picker */}
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface-elevated rounded-2xl border border-white/[0.06] p-3"
          >
            <div className="grid grid-cols-6 gap-3">
              {memoryColors.map((color) => (
                <motion.button
                  key={color}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => { setSelectedColor(color); setShowColorPicker(false); }}
                  className={cn(
                    'w-10 h-10 rounded-xl cursor-pointer transition-all relative',
                    selectedColor === color && 'ring-2 ring-white/40 ring-offset-2 ring-offset-night-950'
                  )}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === color && (
                    <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

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
              className="w-full bg-surface-elevated border border-white/[0.06] rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-lumia-500/40 focus:ring-1 focus:ring-lumia-500/20 transition-all"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px' }}
            />
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.15}>
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

        {/* Date */}
        <FadeIn delay={0.2}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-2 block uppercase tracking-wider">
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-surface-elevated border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-text-primary focus:outline-none focus:border-lumia-500/40 focus:ring-1 focus:ring-lumia-500/20 transition-all"
            />
          </div>
        </FadeIn>

        {/* Mood Selector */}
        <FadeIn delay={0.25}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-3 block uppercase tracking-wider flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5" />
              Como você se sentiu?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((mood) => (
                <motion.button
                  key={mood.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(mood.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-pointer',
                    selectedMood === mood.id
                      ? 'border-lumia-500/40 bg-lumia-500/10'
                      : 'border-white/[0.06] bg-surface-elevated hover:border-white/10'
                  )}
                >
                  <span className="text-lg">{mood.emoji}</span>
                  <span className={cn(
                    'text-xs font-medium',
                    selectedMood === mood.id ? 'text-lumia-400' : 'text-text-secondary'
                  )}>
                    {mood.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Category Selector */}
        <FadeIn delay={0.3}>
          <div>
            <label className="text-xs font-medium text-text-muted mb-3 block uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              Categoria
            </label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all cursor-pointer',
                    selectedCategory === cat.id
                      ? 'border-lumia-500/40 bg-lumia-500/10'
                      : 'border-white/[0.06] bg-surface-elevated hover:border-white/10'
                  )}
                >
                  <span className="text-lg">{cat.emoji}</span>
                  <span className={cn(
                    'text-[10px] font-medium',
                    selectedCategory === cat.id ? 'text-lumia-400' : 'text-text-muted'
                  )}>
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Save Button */}
        <FadeIn delay={0.35}>
          <div className="pt-2 pb-4">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSave}
              loading={saving}
              disabled={!canSave}
              icon={!saving ? <Check className="w-5 h-5" /> : undefined}
            >
              {saving
                ? 'Salvando...'
                : isEditing
                ? 'Salvar alterações'
                : 'Guardar memória'}
            </Button>
          </div>
        </FadeIn>
      </div>
    </Container>
  );
}
