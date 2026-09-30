import React from 'react';
import { Flag, CheckCircle2, XCircle, AlertCircle, RefreshCcw, Send } from 'lucide-react';
import { Question, QuestionEvaluation } from '../types/quiz';

interface QuestionNavigatorProps {
  questions: Question[];
  answers: Record<string | number, string | string[]>;
  flagged: (string | number)[];
  isReview: boolean;
  evaluations?: Record<string | number, QuestionEvaluation>;
  onSubmitClick: () => void;
  onRetryClick?: () => void;
  onScrollToQuestion: (qId: string | number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  questions,
  answers,
  flagged,
  isReview,
  evaluations,
  onSubmitClick,
  onRetryClick,
  onScrollToQuestion,
}) => {
  const getButtonStyles = (q: Question) => {
    const qId = q.id;
    const userAns = answers[qId];
    const isAnswered =
      userAns !== undefined &&
      userAns !== null &&
      (Array.isArray(userAns) ? userAns.length > 0 : String(userAns).trim() !== '');

    if (isReview) {
      if (q.type === 'essay') {
        return 'bg-blue-600 text-white border-blue-600';
      }
      const evalItem = evaluations ? evaluations[qId] : undefined;
      if (!evalItem || evalItem.isUnanswered) {
        return 'bg-amber-400 text-white border-amber-400 shadow-sm';
      }
      if (evalItem.isCorrect) {
        return 'bg-emerald-500 text-white border-emerald-500 shadow-sm';
      }
      return 'bg-rose-500 text-white border-rose-500 shadow-sm';
    }

    // Playing state
    if (isAnswered) {
      return 'bg-blue-600 text-white border-blue-600 font-semibold shadow-sm';
    }
    return 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-slate-50';
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Navigator Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-sm">
          {isReview ? 'Tổng quan kết quả' : 'Tiến độ làm bài'}
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {Object.keys(answers).filter((k) => {
            const v = answers[k];
            return v && (Array.isArray(v) ? v.length > 0 : String(v).trim() !== '');
          }).length}{' '}
          / {questions.length} đã làm
        </span>
      </div>

      {/* Grid of Question Numbers */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar max-h-80 md:max-h-none">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isFlagged = flagged.includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onScrollToQuestion(q.id)}
                className={`relative flex items-center justify-center h-10 w-full rounded-lg border text-xs sm:text-sm font-semibold transition-all ${getButtonStyles(
                  q
                )}`}
                aria-label={`Chuyển tới câu ${idx + 1}`}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}

                {/* Flag Dot in playing state */}
                {!isReview && isFlagged && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          {!isReview ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-blue-600 rounded" />
                <span>Đã chọn ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-white border border-slate-300 rounded" />
                <span>Chưa chọn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                <span>Đã đặt cờ ({flagged.length})</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-emerald-500 rounded" />
                <span>Trả lời đúng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-rose-500 rounded" />
                <span>Trả lời sai</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-amber-400 rounded" />
                <span>Bỏ trống</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-blue-600 rounded" />
                <span>Tự luận (không chấm tự động)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigator Footer Action */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        {!isReview ? (
          <button
            type="button"
            onClick={onSubmitClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Send size={16} /> NỘP BÀI
          </button>
        ) : (
          onRetryClick && (
            <button
              type="button"
              onClick={onRetryClick}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCcw size={16} /> LÀM ĐỀ KHÁC
            </button>
          )
        )}
      </div>
    </div>
  );
};
