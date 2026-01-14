// TypeScript interfaces for PM-AI Learning

export type LearningMode = 'presentation' | 'learning' | 'quiz';

export interface ModuleMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  icon: string;
  lessons: LessonMeta[];
}

export interface LessonMeta {
  slug: string;
  title: string;
  order: number;
  hasQuiz: boolean;
  estimatedTime: number; // in minutes
}

export interface LessonContent extends LessonMeta {
  content: string; // Rendered HTML
  rawContent: string; // Original markdown
  slides: Slide[]; // H2-split sections for Presentation Mode
  quiz: QuizQuestion[];
  moduleSlug: string;
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizState {
  answers: Record<string, number>;
  submitted: boolean;
  score: number;
  totalQuestions: number;
}

export interface NavigationItem {
  title: string;
  slug: string;
  icon?: string;
  children?: NavigationItem[];
  isActive?: boolean;
  isCompleted?: boolean;
}

// Frontmatter interface for gray-matter parsing
export interface LessonFrontmatter {
  title: string;
  order?: number;
  quiz?: boolean;
  estimatedTime?: number;
  description?: string;
}

export interface ModuleFrontmatter {
  title: string;
  description?: string;
  order?: number;
  icon?: string;
}
