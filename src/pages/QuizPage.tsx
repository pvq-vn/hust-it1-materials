import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Question,
  Subject,
  QuizConfig,
  QuizResult,
  QuizAttempt,
  ErrorReport,
} from '../types/quiz';
import { loadExamFile } from '../data/dataLoader';
import { sampleAndPrepareQuestions } from '../engine/sampler';
import { calculateQuizResult } from '../engine/scoring';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionNavigator } from '../components/QuestionNavigator';
import { TimerDisplay } from '../components/TimerDisplay';
import { ErrorReportModal } from '../components/ErrorReportModal';
import { draftService, QuizDraft } from '../services/draftService';
import { historyService } from '../services/historyService';
import { authService, UserProfile } from '../services/authService';
import {
  Clock,
  Send,
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Copy,
  ChevronLeft,
  BookOpen,
} from 'lucide-react';

interface QuizPageProps {
  subject: Subject;
  config: QuizConfig;
  initialAttempt?: QuizAttempt | null;
  onExit: () => void;
  onRetryWithSameSeed: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  subject,
  config,
  initialAttempt,
  onExit,
  onRetryWithSameSeed,
}) => {
  // Game states: 'loading', 'playing', 'review'
  const [gameState, setGameState] = useState<'loading' | 'playing' | 'review'>(
    initialAttempt ? 'review' : 'loading'
  );
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Core quiz state
  const [questions, setQuestions] = useState<Question[]>(
    initialAttempt ? initialAttempt.questions : []
  );
  const [answers, setAnswers] = useState<Record<string | number, string | string[]>>(
    initialAttempt ? initialAttempt.answers : {}
  );
  const [flagged, setFlagged] = useState<(string | number)[]>(
    initialAttempt ? initialAttempt.flagged : []
  );

  // Time management
  const calculateTotalSeconds = () => {
    if (config.timeMode === 'unlimited') return 0;
    if (config.timeMode === 'auto') {
      const minutes = config.customMinutes || Math.max(15, Math.ceil(((config.mcqCount + config.essayCount) * 1.5) / 5) * 5);
      return minutes * 60;
    }
    return parseInt(config.timeMode, 10) * 60;
  };

  const [totalDuration] = useState<number>(calculateTotalSeconds());
  const [timeRemaining, setTimeRemaining] = useState<number>(
    initialAttempt ? 0 : calculateTotalSeconds()
  );
  const [startedAt] = useState<string>(
    initialAttempt ? initialAttempt.startedAt : new Date().toISOString()
  );

  // Results
  const [result, setResult] = useState<QuizResult | null>(
    initialAttempt ? initialAttempt.result : null
  );

  // Modals & UI
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [reportingQuestion, setReportingQuestion] = useState<Question | null>(null);
  const [copiedSeed, setCopiedSeed] = useState(false);

  // Current user
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    authService.getCurrentUser().then(setCurrentUser);
  }, []);

  // 1. Initial Data Loading & Question Preparation
  useEffect(() => {
    if (initialAttempt) {
      setGameState('review');
      return;
    }

    let isMounted = true;
    setGameState('loading');
    setLoadingError(null);

    loadExamFile(config.examFilePath)
      .then((allQuestions) => {
        if (!isMounted) return;

        if (allQuestions.length === 0) {
          throw new Error('Ngân hàng câu hỏi không có dữ liệu');
        }

        const prepared = sampleAndPrepareQuestions(allQuestions, config);
        setQuestions(prepared);
        setGameState('playing');

        // Initial draft save
        draftService.saveDraft({
          subjectId: subject.id,
          subjectName: subject.name,
          subjectCode: subject.code,
          config,
          questions: prepared,
          answers: {},
          flagged: [],
          timeRemaining: calculateTotalSeconds(),
          totalDuration: calculateTotalSeconds(),
          startedAt: new Date().toISOString(),
        });
      })
      .catch((err) => {
        if (isMounted) {
          setLoadingError((err as Error).message || 'Không thể tải đề thi.');
          setGameState('loading');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [config.examFilePath, config.seed, initialAttempt]);

  // 2. Draft periodic sync while playing
  useEffect(() => {
    if (gameState !== 'playing' || questions.length === 0) return;

    draftService.saveDraft({
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      config,
      questions,
      answers,
      flagged,
      timeRemaining,
      totalDuration,
      startedAt,
    });
  }, [answers, flagged, timeRemaining, gameState, questions]);

  // Answer handler
  const handleAnswerChange = (qId: string | number, value: string | string[]) => {
    if (gameState !== 'playing') return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  // Flag toggle
  const handleToggleFlag = (qId: string | number) => {
    if (gameState !== 'playing') return;
    setFlagged((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  // Scroll smoothly to question
  const scrollToQuestion = (qId: string | number) => {
    const el = document.getElementById(`question-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Final submission logic
  const handleFinalSubmit = () => {
    setShowSubmitConfirm(false);

    const timeSpent = totalDuration > 0 ? totalDuration - timeRemaining : 0;
    const computedResult = calculateQuizResult(questions, answers, timeSpent);
    setResult(computedResult);
    setGameState('review');

    // Clear active draft
    draftService.clearDraft();

    // Trigger confetti if score is great
    if (computedResult.score10 >= 8.0) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }

    // Save attempt to history
    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      userId: currentUser?.id,
      subjectId: subject.id,
      subjectName: subject.name,
      subjectCode: subject.code,
      seed: config.seed,
      score10: computedResult.score10,
      totalScoredQuestions: computedResult.totalScoredQuestions,
      correctCount: computedResult.correctCount,
      unansweredCount: computedResult.unansweredCount,
      essayCount: computedResult.essayCount,
      timeSpentSeconds: timeSpent,
      startedAt,
      submittedAt: new Date().toISOString(),
      config,
      questions,
      answers,
      flagged,
      result: computedResult,
    };

    historyService.saveAttempt(attempt);

    // Scroll to top
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copySeed = () => {
    navigator.clipboard.writeText(config.seed);
    setCopiedSeed(true);
    setTimeout(() => setCopiedSeed(false), 2000);
  };

  const unansweredCount = questions.filter((q) => {
    const a = answers[q.id];
    return !a || (Array.isArray(a) ? a.length === 0 : String(a).trim() === '');
  }).length;

  // Format seconds to string mm:ss
  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} phút ${s < 10 ? '0' : ''}${s} giây`;
  };

  // LOADING STATE
  if (gameState === 'loading') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        {loadingError ? (
          <div className="max-w-md p-6 bg-white rounded-2xl border border-rose-200 shadow-sm space-y-4">
            <AlertCircle size={40} className="text-rose-500 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">Không thể tải đề thi</h3>
            <p className="text-xs text-rose-600 leading-relaxed">{loadingError}</p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Quay về danh sách môn
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">Đang tạo bộ đề thi...</h3>
            <p className="text-xs text-slate-500">
              Đang tải ngân hàng {subject.code} & áp dụng mã đề <strong>{config.seed}</strong>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row pb-12">
      {/* LEFT/SIDEBAR NAVIGATOR (STICKY ON DESKTOP) */}
      <aside className="w-full md:w-80 md:h-[calc(100vh-4.5rem)] md:sticky top-20 flex flex-col shrink-0 space-y-4 mb-6 md:mb-0 md:pr-4">
        {/* Course Banner Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-blue-700 text-sm">
                {subject.code}
              </span>
              <span className="text-[11px] text-slate-400">· Kỳ {subject.semester}</span>
            </div>
            <h2 className="font-bold text-slate-800 text-sm truncate max-w-[170px]">
              {subject.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onExit}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1 font-medium transition-colors"
            title="Thoát khỏi bài thi"
          >
            <ChevronLeft size={16} /> Thoát
          </button>
        </div>

        {/* Timer Box (in playing mode) */}
        {gameState === 'playing' && (
          <div className="flex justify-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
            <TimerDisplay
              timeRemaining={timeRemaining}
              totalDuration={totalDuration}
              isPaused={gameState !== 'playing'}
              onTimeUpdate={setTimeRemaining}
              onTimeUp={handleFinalSubmit}
            />
          </div>
        )}

        {/* Navigator Component */}
        <div className="flex-1 min-h-[300px]">
          <QuestionNavigator
            questions={questions}
            answers={answers}
            flagged={flagged}
            isReview={gameState === 'review'}
            evaluations={result?.evaluations}
            onSubmitClick={() => setShowSubmitConfirm(true)}
            onRetryClick={onExit}
            onScrollToQuestion={scrollToQuestion}
          />
        </div>
      </aside>

      {/* RIGHT: MAIN QUESTIONS CONTENT */}
      <main className="flex-1 md:pl-2" ref={mainScrollRef}>
        {/* REVIEW STATS BANNER */}
        {gameState === 'review' && result && (
          <section className="mb-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Kết quả kiểm tra
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {result.score10 >= 8.0
                  ? 'Xuất sắc! 🎉'
                  : result.score10 >= 5.0
                  ? 'Đã hoàn thành! 👍'
                  : 'Cần ôn tập thêm 📚'}
              </h2>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-3xl sm:text-4xl font-black text-blue-600">
                  {result.score10.toFixed(2)}
                </div>
                <div className="text-xs font-semibold text-slate-500 mt-1 uppercase">
                  Điểm / Thang 10
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600">
                  {result.correctCount}
                </div>
                <div className="text-xs font-semibold text-emerald-700 mt-1 uppercase">
                  Câu đúng
                </div>
              </div>

              <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 text-rose-800">
                <div className="text-3xl sm:text-4xl font-black text-rose-600">
                  {result.wrongCount}
                </div>
                <div className="text-xs font-semibold text-rose-700 mt-1 uppercase">
                  Câu sai
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
                <div className="text-3xl sm:text-4xl font-black text-amber-600">
                  {result.unansweredCount}
                </div>
                <div className="text-xs font-semibold text-amber-700 mt-1 uppercase">
                  Bỏ trống
                </div>
              </div>
            </div>

            {/* Essay Notice */}
            {result.essayCount > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-900 mb-4 flex items-center justify-between">
                <span>
                  Đề thi có <strong>{result.essayCount} câu tự luận</strong> (không tính vào điểm trắc nghiệm, hãy đối chiếu câu trả lời với Model answer phía dưới).
                </span>
                <span className="font-bold text-blue-700 shrink-0 ml-2">
                  Trắc nghiệm: {result.score10}/10
                </span>
              </div>
            )}

            {/* Time spent & Seed info */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock size={14} /> Thời gian hoàn thành:{' '}
                <strong>{formatSeconds(result.timeSpentSeconds)}</strong>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  Mã đề: <strong className="font-mono">{config.seed}</strong>
                </span>
                <button
                  type="button"
                  onClick={copySeed}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1 transition-colors"
                  title="Sao chép mã đề"
                >
                  <Copy size={12} /> {copiedSeed ? 'Đã chép' : 'Chép'}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onRetryWithSameSeed}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCcw size={15} /> Làm lại đề này (Cùng Seed)
              </button>
              <button
                type="button"
                onClick={onExit}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                Làm đề khác / Môn khác
              </button>
            </div>
          </section>
        )}

        {/* QUESTIONS LIST */}
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={idx}
              userAnswer={answers[q.id]}
              isFlagged={flagged.includes(q.id)}
              isReview={gameState === 'review'}
              evaluation={result?.evaluations[q.id]}
              onAnswerChange={handleAnswerChange}
              onToggleFlag={handleToggleFlag}
              onReportClick={(question) => setReportingQuestion(question)}
            />
          ))}
        </div>

        {/* SUBMIT BUTTON AT BOTTOM */}
        {gameState === 'playing' && (
          <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <h3 className="font-bold text-slate-800 text-base mb-1">
              Bạn đã kiểm tra kỹ toàn bộ các câu hỏi?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Sau khi nộp bài, hệ thống sẽ chấm điểm trắc nghiệm và hiển thị giải thích chi tiết cho từng câu.
            </p>
            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <Send size={16} /> NỘP BÀI THI
            </button>
          </div>
        )}
      </main>

      {/* CONFIRMATION SUBMIT MODAL */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full p-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <AlertCircle size={44} className="text-blue-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-lg">Xác nhận nộp bài thi?</h3>

            {unansweredCount > 0 ? (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200 leading-relaxed">
                Bạn còn <strong>{unansweredCount} câu chưa làm</strong>. Các câu bỏ trống sẽ được tính là 0 điểm.
              </p>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed">
                Bạn đã hoàn thành đủ {questions.length} câu. Bạn có muốn nộp bài ngay bây giờ?
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR REPORT MODAL */}
      {reportingQuestion && (
        <ErrorReportModal
          question={reportingQuestion}
          subjectId={subject.id}
          subjectCode={subject.code}
          onClose={() => setReportingQuestion(null)}
        />
      )}
    </div>
  );
};
