import { v4 as uuidv4 } from 'uuid';
import type { Memory, MemoryFormData } from '@/types/memory';

const STORAGE_KEY = 'lumia_memories';
const WELCOME_KEY = 'lumia_welcome_seen';
const EMOTIONAL_QUOTE_KEY = 'lumia_quote_date';

// ─── Memory CRUD ─────────────────────────────────────────

export function getMemories(): Memory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Memory[];
  } catch {
    return [];
  }
}

export function getMemoryById(id: string): Memory | undefined {
  const memories = getMemories();
  return memories.find((m) => m.id === id);
}

export function createMemory(formData: MemoryFormData): Memory {
  const now = new Date().toISOString();
  const memory: Memory = {
    id: uuidv4(),
    ...formData,
    createdAt: now,
    updatedAt: now,
  };
  
  const memories = getMemories();
  memories.unshift(memory);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  
  return memory;
}

export function updateMemory(id: string, formData: Partial<MemoryFormData>): Memory | undefined {
  const memories = getMemories();
  const index = memories.findIndex((m) => m.id === id);
  
  if (index === -1) return undefined;
  
  memories[index] = {
    ...memories[index],
    ...formData,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  return memories[index];
}

export function deleteMemory(id: string): boolean {
  const memories = getMemories();
  const filtered = memories.filter((m) => m.id !== id);
  
  if (filtered.length === memories.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function toggleFavorite(id: string): Memory | undefined {
  const memories = getMemories();
  const memory = memories.find((m) => m.id === id);
  
  if (!memory) return undefined;
  
  memory.favorite = !memory.favorite;
  memory.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
  
  return memory;
}

// ─── Welcome State ──────────────────────────────────────

export function hasSeenWelcome(): boolean {
  return localStorage.getItem(WELCOME_KEY) === 'true';
}

export function markWelcomeSeen(): void {
  localStorage.setItem(WELCOME_KEY, 'true');
}

// ─── Emotional Quotes ────────────────────────────────────

const emotionalQuotes = [
  { text: "As memórias são o perfume da alma.", author: "George Sand" },
  { text: "A memória é o diário que todos nós carregamos conosco.", author: "Oscar Wilde" },
  { text: "Lembrar é viver duas vezes.", author: "Provérbio" },
  { text: "Cada momento vivido é uma estrela que ilumina nosso céu interior.", author: "Lumia" },
  { text: "Os momentos mais simples guardam as maiores emoções.", author: "Lumia" },
  { text: "Guardar memórias é cultivar um jardim eterno na alma.", author: "Lumia" },
  { text: "O tempo passa, mas as memórias são para sempre.", author: "Lumia" },
  { text: "A felicidade é feita de momentos que decidimos lembrar.", author: "Lumia" },
  { text: "Cada lembrança é uma ponte entre quem fomos e quem somos.", author: "Lumia" },
  { text: "O coração guarda o que a mente às vezes esquece.", author: "Lumia" },
  { text: "Nostalgia é a saudade de um momento que nos fez sorrir.", author: "Lumia" },
  { text: "As melhores histórias são as que vivemos.", author: "Lumia" },
  { text: "Cada foto é uma janela para um mundo de emoções.", author: "Lumia" },
  { text: "A vida é uma coleção de momentos preciosos.", author: "Lumia" },
];

export function getDailyQuote(): { text: string; author: string } {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(EMOTIONAL_QUOTE_KEY);
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        return parsed.quote;
      }
    } catch {
      // regenerate
    }
  }
  
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % emotionalQuotes.length;
  const quote = emotionalQuotes[index];
  
  localStorage.setItem(EMOTIONAL_QUOTE_KEY, JSON.stringify({ date: today, quote }));
  return quote;
}

// ─── "On This Day" Feature ──────────────────────────────

export function getMemoriesOnThisDay(): Memory[] {
  const memories = getMemories();
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();
  
  return memories.filter((m) => {
    const memDate = new Date(m.date);
    return memDate.getMonth() === month && memDate.getDate() === day && memDate.getFullYear() !== today.getFullYear();
  });
}

// ─── Stats ───────────────────────────────────────────────

export function getMemoryStats() {
  const memories = getMemories();
  const now = new Date();
  const thisMonth = memories.filter((m) => {
    const d = new Date(m.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  
  const favorites = memories.filter((m) => m.favorite);
  
  const moodCounts: Record<string, number> = {};
  memories.forEach((m) => {
    moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
  });
  
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  
  return {
    total: memories.length,
    thisMonth: thisMonth.length,
    favorites: favorites.length,
    topMood,
  };
}
