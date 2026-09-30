import { Question, QuizConfig } from '../types/quiz';

export interface QuizDraft {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  config: QuizConfig;
  questions: Question[];
  answers: Record<string | number, string | string[]>;
  flagged: (string | number)[];
  timeRemaining: number;
  totalDuration: number;
  startedAt: string;
  savedAt: string;
}

const DRAFT_KEY = 'hust_quiz_active_draft';

export const draftService = {
  saveDraft(draft: Omit<QuizDraft, 'savedAt'>): void {
    try {
      const fullDraft: QuizDraft = {
        ...draft,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(fullDraft));
    } catch (e) {
      console.warn('Failed to save quiz draft:', e);
    }
  },

  getDraft(): QuizDraft | null {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const parsed: QuizDraft = JSON.parse(raw);
      // If draft is older than 24 hours, discard
      const ageHours = (Date.now() - new Date(parsed.savedAt).getTime()) / (1000 * 60 * 60);
      if (ageHours > 24) {
        draftService.clearDraft();
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  },

  clearDraft(): void {
    localStorage.removeItem(DRAFT_KEY);
  },
};
