export type MoodType = 'happy' | 'love' | 'calm' | 'adventure' | 'nostalgic' | 'grateful';

export type CategoryType = 
  | 'momento' 
  | 'viagem' 
  | 'familia' 
  | 'conquista' 
  | 'natureza' 
  | 'celebracao'
  | 'reflexao'
  | 'outro';

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string; // ISO string
  category: CategoryType;
  emoji: string;
  color: string;
  mood: MoodType;
  favorite: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  // Prepared for future photo support
  photoUrl?: string;
}

export interface MemoryFormData {
  title: string;
  description: string;
  date: string;
  category: CategoryType;
  emoji: string;
  color: string;
  mood: MoodType;
  favorite: boolean;
}
