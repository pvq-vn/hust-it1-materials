import { Question } from '../types/quiz';
import { normalizeExam } from '../engine/normalizer';

// In-memory cache of normalized questions per file path
const examCache = new Map<string, Question[]>();

// Vite glob to load all JSON files across semesters as raw text strings
const rawExamModules =
  typeof (import.meta as any).glob === 'function'
    ? (import.meta as any).glob(
        ['/20*/**/Gemini/*.json', '/20*/**/Gemini/*.JSON'],
        { query: '?raw', import: 'default' }
      )
    : {};

/**
 * Robust in-memory JSON repairer for raw exam files in the repo.
 * NEVER modifies any file on disk.
 */
export function sanitizeExamJsonText(raw: string): string {
  // 1. Fix unquoted note IDs e.g. "id": 64 - Đến đây, -> "id": "64 - Đến đây",
  let text = raw.replace(/"id":\s*([0-9]+)\s*-\s*([^,\n\r]+),/g, '"id": "$1 - $2",');
  
  // 2. Fix trailing commas before } or ]
  text = text.replace(/,\s*([\]}])/g, '$1');

  // 3. Remove BOM if present
  if (text.charCodeAt(0) === 0xfeff) {
    text = text.slice(1);
  }

  return text;
}

/**
 * Loads and normalizes an exam JSON file from its file path.
 * Tries Vite bundled raw module first, then falls back to fetch().
 */
export async function loadExamFile(filePath: string): Promise<Question[]> {
  const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;

  if (examCache.has(normalizedPath)) {
    return examCache.get(normalizedPath)!;
  }

  let rawContent: string | null = null;

  // 1. Try matching from rawExamModules
  // Try exact match or case-insensitive match
  const moduleKey = Object.keys(rawExamModules).find(
    (key) => key.toLowerCase() === normalizedPath.toLowerCase()
  );

  if (moduleKey && rawExamModules[moduleKey]) {
    try {
      const loader = rawExamModules[moduleKey] as () => Promise<string>;
      rawContent = await loader();
    } catch (e) {
      console.warn(`Failed loading raw module for ${normalizedPath}, falling back to fetch`, e);
    }
  }

  // 2. Fallback to browser fetch
  if (!rawContent) {
    try {
      const encodedPath = encodeURI(normalizedPath);
      const res = await fetch(encodedPath);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      rawContent = await res.text();
    } catch (fetchErr) {
      throw new Error(`Không thể tải dữ liệu đề thi từ ${filePath}: ${(fetchErr as Error).message}`);
    }
  }

  if (!rawContent) {
    throw new Error(`Dữ liệu đề trống: ${filePath}`);
  }

  // 3. Parse JSON with memory sanitization
  let parsed: any;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    try {
      const sanitized = sanitizeExamJsonText(rawContent);
      parsed = JSON.parse(sanitized);
    } catch (parseErr) {
      throw new Error(`Lỗi cú pháp JSON trong file đề thi: ${(parseErr as Error).message}`);
    }
  }

  // 4. Normalize to unified schema
  const questions = normalizeExam(parsed);

  // 5. Cache and return
  examCache.set(normalizedPath, questions);
  return questions;
}

export interface ExamStats {
  totalCount: number;
  mcqCount: number;
  essayCount: number;
}

/**
 * Gets count statistics for an exam file (cached or loaded).
 */
export async function getExamStats(filePath: string): Promise<ExamStats> {
  const questions = await loadExamFile(filePath);
  const essayCount = questions.filter((q) => q.type === 'essay').length;
  const mcqCount = questions.length - essayCount;
  return {
    totalCount: questions.length,
    mcqCount,
    essayCount,
  };
}
