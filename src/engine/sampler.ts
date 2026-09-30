import { Question, QuizConfig } from '../types/quiz';
import { createRNG, fisherYatesShuffle } from './shuffle';

export function sampleAndPrepareQuestions(
  allQuestions: Question[],
  config: QuizConfig
): Question[] {
  const rng = createRNG(config.seed);

  // 1. Separate MCQ (single, multiple, dropdown, fill) and Essay
  const mcqQuestions = allQuestions.filter((q) => q.type !== 'essay');
  const essayQuestions = allQuestions.filter((q) => q.type === 'essay');

  // 2. Shuffle before sampling if requested or random
  const shuffledMcq = fisherYatesShuffle(mcqQuestions, rng);
  const shuffledEssay = fisherYatesShuffle(essayQuestions, rng);

  // 3. Take requested counts
  const actualMcqCount = Math.min(config.mcqCount, shuffledMcq.length);
  const actualEssayCount = Math.min(config.essayCount, shuffledEssay.length);

  const selectedMcq = shuffledMcq.slice(0, actualMcqCount);
  const selectedEssay = shuffledEssay.slice(0, actualEssayCount);

  // 4. Combine
  let combined = [...selectedMcq, ...selectedEssay];

  // 5. Shuffle combined questions if requested
  if (config.shuffleQuestions) {
    combined = fisherYatesShuffle(combined, rng);
  }

  // 6. Shuffle options if requested (only for single/multiple with options)
  if (config.shuffleOptions) {
    combined = combined.map((q) => {
      if ((q.type === 'single' || q.type === 'multiple') && q.options && q.options.length > 1) {
        // Do not shuffle if options look like "Tất cả các đáp án trên" or ordered
        const hasOrderedOption = q.options.some((o) =>
          /tất cả|cả .* đều|không có đáp án/i.test(o.text)
        );
        if (!hasOrderedOption) {
          const shuffledOptions = fisherYatesShuffle(q.options, rng);
          return {
            ...q,
            options: shuffledOptions,
          };
        }
      }
      return q;
    });
  }

  return combined;
}
