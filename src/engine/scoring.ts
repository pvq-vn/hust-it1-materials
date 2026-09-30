import { Question, QuestionEvaluation, QuizResult } from '../types/quiz';

/**
 * Normalizes text for fill-in-the-blank answer checking.
 */
function normalizeFillText(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[,\s]+/g, ' ')
    .replace(/[^\w\s\d\.\-]/g, '');
}

/**
 * Evaluates a single question against the user's answer.
 */
export function evaluateQuestion(
  q: Question,
  userAnsRaw: string | string[] | undefined
): QuestionEvaluation {
  const points = q.points || 1;

  if (q.type === 'essay') {
    // Essay questions are NOT scored automatically
    return {
      isCorrect: false,
      isUnanswered: !userAnsRaw || (typeof userAnsRaw === 'string' && userAnsRaw.trim() === ''),
      earnedPoints: 0,
      maxPoints: 0,
      userAnswer: userAnsRaw || '',
      correctAnswers: q.correctAnswers || [],
    };
  }

  // Check unanswered
  let isUnanswered = false;
  if (userAnsRaw === undefined || userAnsRaw === null) {
    isUnanswered = true;
  } else if (Array.isArray(userAnsRaw)) {
    isUnanswered = userAnsRaw.length === 0;
  } else if (typeof userAnsRaw === 'string') {
    isUnanswered = userAnsRaw.trim() === '';
  }

  if (isUnanswered) {
    return {
      isCorrect: false,
      isUnanswered: true,
      earnedPoints: 0,
      maxPoints: points,
      userAnswer: Array.isArray(userAnsRaw) ? [] : '',
      correctAnswers: q.correctAnswers,
    };
  }

  let isCorrect = false;

  switch (q.type) {
    case 'single': {
      const selected = Array.isArray(userAnsRaw) ? userAnsRaw[0] : userAnsRaw;
      const target = q.correctAnswers[0];
      if (selected && target) {
        isCorrect = selected.toLowerCase().trim() === target.toLowerCase().trim();
      }
      break;
    }

    case 'multiple': {
      const rawArr = Array.isArray(userAnsRaw) ? userAnsRaw : userAnsRaw !== undefined ? [userAnsRaw] : [];
      const userList = rawArr.map((a) => String(a).toLowerCase().trim());
      const correctList = (q.correctAnswers || []).map((a) => a.toLowerCase().trim());

      const allCorrectSelected = correctList.every((a) => userList.includes(a));
      const noWrongSelected = userList.every((a) => correctList.includes(a));
      isCorrect =
        allCorrectSelected && noWrongSelected && userList.length === correctList.length;
      break;
    }

    case 'fill': {
      const userText = normalizeFillText(Array.isArray(userAnsRaw) ? userAnsRaw[0] : userAnsRaw || '');
      // Check against any valid answer in correctAnswers
      const validAnswers: string[] = [];
      q.correctAnswers.forEach((ans) => {
        // Support splitting by '|' or ';' if author specified multiple choices
        ans.split(/[|;]/).forEach((sub) => validAnswers.push(normalizeFillText(sub)));
      });

      isCorrect = validAnswers.some((valid) => valid === userText);
      break;
    }

    case 'dropdown': {
      // User answer can be array of selected option IDs or indices for [1], [2], ...
      const userAnswers = Array.isArray(userAnsRaw) ? userAnsRaw : userAnsRaw !== undefined ? [userAnsRaw] : [];
      const correctAnswers = q.correctAnswers || [];

      if (userAnswers.length === correctAnswers.length && userAnswers.length > 0) {
        isCorrect = correctAnswers.every((corr, idx) => {
          const userVal = String(userAnswers[idx] || '').trim().toLowerCase();
          const corrVal = String(corr).trim().toLowerCase();
          return userVal === corrVal;
        });
      }
      break;
    }
  }

  return {
    isCorrect,
    isUnanswered: false,
    earnedPoints: isCorrect ? points : 0,
    maxPoints: points,
    userAnswer: userAnsRaw !== undefined ? userAnsRaw : '',
    correctAnswers: q.correctAnswers,
  };
}

/**
 * Calculates overall quiz results for a list of questions and user answers.
 */
export function calculateQuizResult(
  questions: Question[],
  answers: Record<string | number, string | string[]>,
  timeSpentSeconds: number
): QuizResult {
  const evaluations: Record<string | number, QuestionEvaluation> = {};

  let totalPossibleScore = 0;
  let earnedScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  let essayCount = 0;
  let totalScoredQuestions = 0;

  questions.forEach((q) => {
    const userAns = answers[q.id];
    const evaluation = evaluateQuestion(q, userAns);
    evaluations[q.id] = evaluation;

    if (q.type === 'essay') {
      essayCount++;
    } else {
      totalScoredQuestions++;
      totalPossibleScore += evaluation.maxPoints;
      earnedScore += evaluation.earnedPoints;

      if (evaluation.isUnanswered) {
        unansweredCount++;
      } else if (evaluation.isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }
  });

  const rawScale = totalPossibleScore > 0 ? (earnedScore / totalPossibleScore) * 10 : 0;
  const score10 = Math.round(rawScale * 100) / 100;

  return {
    score10,
    totalPossibleScore,
    earnedScore,
    totalQuestions: questions.length,
    totalScoredQuestions,
    correctCount,
    wrongCount,
    unansweredCount,
    essayCount,
    timeSpentSeconds,
    evaluations,
  };
}
