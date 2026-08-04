import type { MoodType, CategoryType } from '@/types/memory';

export const moods: { id: MoodType; emoji: string; label: string; color: string }[] = [
  { id: 'happy', emoji: '😊', label: 'Feliz', color: '#F59E0B' },
  { id: 'love', emoji: '❤️', label: 'Amor', color: '#F43F5E' },
  { id: 'calm', emoji: '😌', label: 'Calmo', color: '#0EA5E9' },
  { id: 'adventure', emoji: '🤩', label: 'Aventura', color: '#10B981' },
  { id: 'nostalgic', emoji: '🥹', label: 'Nostálgico', color: '#8B5CF6' },
  { id: 'grateful', emoji: '🙏', label: 'Grato', color: '#FFAA3E' },
];

export const categories: { id: CategoryType; emoji: string; label: string }[] = [
  { id: 'momento', emoji: '✨', label: 'Momento' },
  { id: 'viagem', emoji: '✈️', label: 'Viagem' },
  { id: 'familia', emoji: '👨‍👩‍👧‍👦', label: 'Família' },
  { id: 'conquista', emoji: '🏆', label: 'Conquista' },
  { id: 'natureza', emoji: '🌿', label: 'Natureza' },
  { id: 'celebracao', emoji: '🎉', label: 'Celebração' },
  { id: 'reflexao', emoji: '💭', label: 'Reflexão' },
  { id: 'outro', emoji: '📝', label: 'Outro' },
];

export const memoryEmojis = [
  '✨', '🌅', '🌊', '🌸', '🌙', '☀️', '🌈', '🦋',
  '🎵', '📸', '💫', '🕊️', '🌺', '🍃', '⭐', '💝',
  '🎭', '🏔️', '🌻', '🎨', '📖', '🕯️', '🌟', '💎',
];

export const memoryColors = [
  '#FFAA3E', '#F43F5E', '#0EA5E9', '#10B981',
  '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4',
  '#84CC16', '#6366F1', '#F97316', '#14B8A6',
];

export function getMoodById(id: MoodType) {
  return moods.find((m) => m.id === id);
}

export function getCategoryById(id: CategoryType) {
  return categories.find((c) => c.id === id);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return 'Boa madrugada';
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`;
  return `${Math.floor(diffDays / 365)} anos atrás`;
}
