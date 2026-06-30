export interface Article {
  id: string;
  title: string;
  category: 'mentalidad' | 'psicologia' | 'estrategia';
  categoryLabel: string;
  readTime: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}

export interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    text: string;
    score: number; // 1-4 indicator
    category: string; // e.g. 'miedo', 'impaciencia', 'autonomia', etc.
  }[];
}

export interface AssessmentResult {
  archetype: string;
  subtitle: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  philosophicalReflection: string;
  nextSteps: string[];
}
