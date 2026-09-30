export type QuestionType = 'single' | 'multiple' | 'essay' | 'dropdown' | 'fill';

export interface Option {
  id: string; // 'a', 'b', 'c', 'd' or '0', '1', '2'
  text: string;
}

export interface Question {
  id: string | number;
  type: QuestionType;
  text: string;
  code?: string;
  table?: string;
  link?: string;
  options?: Option[];
  // For single/multiple/fill: string representations
  // For dropdown: can be string[] of correct options or indices
  correctAnswers: string[];
  explanation?: string;
  suggestion?: string;
  scope?: string;
  points?: number;
  // Raw references
  originalNum?: number;
  topic?: string;
  driveImageId?: string;
  imageUrl?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  semester: string;
  examFiles: {
    label: string;
    filePath: string;
    isDefault?: boolean;
  }[];
  description?: string;
  badge?: string;
}

export type TimeMode = 'auto' | 'unlimited' | '15' | '30' | '45' | '60' | 'custom';

export interface QuizConfig {
  subjectId: string;
  examFilePath: string;
  mcqCount: number;
  essayCount: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  timeMode: TimeMode;
  customMinutes?: number;
  seed: string;
}

export interface QuestionEvaluation {
  isCorrect: boolean;
  isUnanswered: boolean;
  earnedPoints: number;
  maxPoints: number;
  userAnswer: string | string[];
  correctAnswers: string[];
}

export interface QuizResult {
  score10: number; // Scaled to 10
  totalPossibleScore: number;
  earnedScore: number;
  totalQuestions: number;
  totalScoredQuestions: number; // MCQ, fill, dropdown
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  essayCount: number; // Unscored
  timeSpentSeconds: number;
  evaluations: Record<string | number, QuestionEvaluation>;
}

export interface QuizAttempt {
  id: string;
  userId?: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  seed: string;
  score10: number;
  totalScoredQuestions: number;
  correctCount: number;
  unansweredCount: number;
  essayCount: number;
  timeSpentSeconds: number;
  startedAt: string;
  submittedAt: string;
  config: QuizConfig;
  questions: Question[];
  answers: Record<string | number, string | string[]>;
  flagged: (string | number)[];
  result: QuizResult;
}

export type ReportType = 
  | 'wrong_answer' 
  | 'wrong_content' 
  | 'missing_image' 
  | 'format_error' 
  | 'wrong_explanation' 
  | 'other';

export type ReportStatus = 'open' | 'reviewing' | 'resolved' | 'rejected';

export interface ErrorReport {
  id: string;
  userId?: string;
  userEmail?: string;
  subjectId: string;
  subjectCode: string;
  questionId: string | number;
  questionText: string;
  type: ReportType;
  description: string;
  status: ReportStatus;
  createdAt: string;
  adminNote?: string;
}
