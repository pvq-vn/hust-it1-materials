import { Question, QuestionType, Option } from '../types/quiz';

/**
 * Normalizes raw question objects from any exam JSON in the repository
 * into the unified internal Question schema.
 */
export function normalizeQuestion(raw: any, index: number): Question {
  const id = raw.id !== undefined && raw.id !== null ? raw.id : index + 1;
  const rawText = raw.text || raw.question || raw['Nội dung'] || '';

  // Extract raw type
  const rawType = (raw.type || raw.typr || '').toString().toLowerCase().trim();

  // Normalize options first to help determine type if missing
  let normalizedOptions: Option[] = [];
  if (Array.isArray(raw.options)) {
    normalizedOptions = raw.options.map((opt: any, optIdx: number) => {
      const letterId = String.fromCharCode(97 + optIdx); // 'a', 'b', 'c', ...
      if (typeof opt === 'string') {
        return { id: letterId, text: opt };
      } else if (typeof opt === 'object' && opt !== null) {
        return {
          id: (opt.id || letterId).toString().toLowerCase(),
          text: opt.text || opt.content || opt.label || '',
        };
      }
      return { id: letterId, text: String(opt) };
    });
  }

  // Extract raw correct answers
  let rawAnswers: any = raw.correctAnswers;
  if (rawAnswers === undefined) rawAnswers = raw.correctAnswer;
  if (rawAnswers === undefined) rawAnswers = raw.correct;

  let normalizedAnswers: string[] = [];
  if (Array.isArray(rawAnswers)) {
    normalizedAnswers = rawAnswers.map((a: any) => String(a).trim());
  } else if (rawAnswers !== undefined && rawAnswers !== null) {
    normalizedAnswers = [String(rawAnswers).trim()];
  }

  // Determine question type
  let type: QuestionType = 'single';
  if (rawType === 'radio' || rawType === 'single') {
    type = 'single';
  } else if (rawType === 'checkbox' || rawType === 'multiple' || rawType === 'multiple_choice') {
    type = 'multiple';
  } else if (rawType === 'essay') {
    type = 'essay';
  } else if (rawType === 'dropdown') {
    type = 'dropdown';
  } else if (rawType === 'fill' || rawType === 'text') {
    type = 'fill';
  } else {
    // Type is missing or unusual - infer from structure
    if (normalizedOptions.length > 0) {
      if (normalizedAnswers.length > 1) {
        type = 'multiple';
      } else {
        type = 'single';
      }
    } else if (rawText.includes('[1]') && rawText.includes('[2]')) {
      type = 'dropdown';
    } else if (normalizedAnswers.length > 0 && normalizedAnswers[0].length < 30) {
      type = 'fill';
    } else {
      type = 'essay';
    }
  }

  // Map answer strings to option IDs if answers are full text or option texts
  if ((type === 'single' || type === 'multiple') && normalizedOptions.length > 0) {
    normalizedAnswers = normalizedAnswers.map((ans) => {
      const lowerAns = ans.toLowerCase();
      // If it already matches an option id ('a', 'b', etc.)
      const directMatch = normalizedOptions.find((o) => o.id === lowerAns);
      if (directMatch) return directMatch.id;

      // If it matches option text
      const textMatch = normalizedOptions.find(
        (o) => o.text.trim().toLowerCase() === lowerAns
      );
      if (textMatch) return textMatch.id;

      return ans;
    });
  }

  // Extract explanation, scope, suggestions
  const explanation = raw.explanation || raw['Giải thích'] || '';
  const scope = raw.scope || raw.category || raw.topic || raw.slideRef || '';
  const suggestion = raw.suggestion || (scope ? `Ôn tập phần: ${scope}` : undefined);

  // Extract code & tables & links
  const code = raw.code || '';
  const table = raw.table || (Array.isArray(raw.tables) ? raw.tables.join('\n\n') : raw.tables) || raw['Link bảng'] || '';
  const link = raw.link || raw.Link || raw.imageUrl || raw.driveImageId || '';
  const driveImageId = raw.driveImageId || extractDriveFileId(link);

  return {
    id,
    type,
    text: rawText,
    code: code ? code.trim() : undefined,
    table: table ? String(table).trim() : undefined,
    link: link ? String(link).trim() : undefined,
    options: normalizedOptions.length > 0 ? normalizedOptions : undefined,
    correctAnswers: normalizedAnswers,
    explanation: explanation ? explanation.trim() : undefined,
    suggestion: suggestion ? suggestion.trim() : undefined,
    scope: scope ? scope.trim() : undefined,
    points: typeof raw.points === 'number' ? raw.points : 1,
    originalNum: raw.originalNum,
    topic: raw.topic || raw.category,
    driveImageId: driveImageId || undefined,
  };
}

export function normalizeExam(rawList: any[]): Question[] {
  if (!Array.isArray(rawList)) return [];
  return rawList.map((item, idx) => normalizeQuestion(item, idx));
}

function extractDriveFileId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  const idMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  return null;
}
