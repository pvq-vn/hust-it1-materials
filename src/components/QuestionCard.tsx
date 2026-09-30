import React from 'react';
import { Flag, CheckCircle2, XCircle, AlertCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { Question, QuestionEvaluation } from '../types/quiz';
import { RichTextRenderer } from './RichTextRenderer';

interface QuestionCardProps {
  question: Question;
  index: number;
  userAnswer?: string | string[];
  isFlagged: boolean;
  isReview: boolean;
  evaluation?: QuestionEvaluation;
  onAnswerChange: (questionId: string | number, value: string | string[]) => void;
  onToggleFlag: (questionId: string | number) => void;
  onReportClick: (question: Question) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  userAnswer,
  isFlagged,
  isReview,
  evaluation,
  onAnswerChange,
  onToggleFlag,
  onReportClick,
}) => {
  const qId = question.id;
  const isCorrect = evaluation?.isCorrect ?? false;
  const isUnanswered = evaluation?.isUnanswered ?? false;

  // Single choice selection
  const handleSingleSelect = (optId: string) => {
    if (isReview) return;
    onAnswerChange(qId, [optId]);
  };

  // Multiple choice selection
  const handleMultipleSelect = (optId: string) => {
    if (isReview) return;
    const current = Array.isArray(userAnswer) ? [...userAnswer] : userAnswer ? [userAnswer] : [];
    if (current.includes(optId)) {
      onAnswerChange(
        qId,
        current.filter((id) => id !== optId)
      );
    } else {
      onAnswerChange(qId, [...current, optId]);
    }
  };

  // Fill in the blank
  const handleFillChange = (val: string) => {
    if (isReview) return;
    onAnswerChange(qId, val);
  };

  // Dropdown slot change
  const handleDropdownChange = (slotIndex: number, optValue: string) => {
    if (isReview) return;
    const current = Array.isArray(userAnswer) ? [...userAnswer] : [];
    current[slotIndex] = optValue;
    onAnswerChange(qId, current);
  };

  // Essay text change
  const handleEssayChange = (val: string) => {
    if (isReview) return;
    onAnswerChange(qId, val);
  };

  // Border styling depending on state
  let cardBorder = 'border-slate-200';
  let cardBg = 'bg-white';
  let headerBg = 'bg-slate-50';

  if (isReview) {
    if (question.type === 'essay') {
      cardBorder = 'border-blue-200';
      headerBg = 'bg-blue-50/60';
    } else if (isUnanswered) {
      cardBorder = 'border-amber-300';
      headerBg = 'bg-amber-50';
    } else if (isCorrect) {
      cardBorder = 'border-emerald-300';
      headerBg = 'bg-emerald-50';
    } else {
      cardBorder = 'border-rose-300';
      headerBg = 'bg-rose-50';
    }
  } else if (isFlagged) {
    cardBorder = 'border-amber-400 ring-1 ring-amber-400';
    cardBg = 'bg-amber-50/10';
  }

  return (
    <div
      id={`question-${qId}`}
      className={`rounded-xl border ${cardBorder} ${cardBg} shadow-sm overflow-hidden scroll-mt-20 transition-all`}
    >
      {/* Question Card Header */}
      <div className={`px-5 py-3.5 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2 ${headerBg}`}>
        <div className="flex items-center flex-wrap gap-2">
          <span className="font-bold text-slate-800 text-sm sm:text-base">
            Câu {index + 1}
          </span>

          {question.points !== undefined && (
            <span className="text-xs text-slate-500 font-normal">
              ({question.points} đ)
            </span>
          )}

          {/* Type Badges */}
          {question.type === 'multiple' && (
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
              Chọn nhiều đáp án
            </span>
          )}
          {question.type === 'fill' && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
              Điền đáp án
            </span>
          )}
          {question.type === 'dropdown' && (
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
              Chọn đáp án phù hợp
            </span>
          )}
          {question.type === 'essay' && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              Tự luận — Không chấm tự động
            </span>
          )}
        </div>

        {/* Right side controls: Flag / Review status / Report */}
        <div className="flex items-center gap-2">
          {isReview ? (
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
              {question.type === 'essay' ? (
                <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  Tự luận
                </span>
              ) : isUnanswered ? (
                <span className="text-amber-700 flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded">
                  <AlertCircle size={15} /> Bỏ trống
                </span>
              ) : isCorrect ? (
                <span className="text-emerald-700 flex items-center gap-1 bg-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle2 size={15} /> Đúng
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1 bg-rose-100 px-2 py-0.5 rounded">
                  <XCircle size={15} /> Sai
                </span>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onToggleFlag(qId)}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-colors ${
                isFlagged
                  ? 'bg-amber-100 text-amber-700 font-semibold'
                  : 'text-slate-400 hover:bg-slate-200 hover:text-slate-700'
              }`}
              title="Đánh dấu câu hỏi cần xem lại"
              aria-label="Cắm cờ câu hỏi"
            >
              <Flag size={15} fill={isFlagged ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">{isFlagged ? 'Đã cắm cờ' : 'Đặt cờ'}</span>
            </button>
          )}

          {/* Report Button */}
          <button
            type="button"
            onClick={() => onReportClick(question)}
            className="p-1.5 rounded text-xs text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
            title="Báo lỗi câu hỏi này"
            aria-label="Báo lỗi câu hỏi"
          >
            <AlertTriangle size={15} />
            <span className="hidden md:inline">Báo lỗi</span>
          </button>
        </div>
      </div>

      {/* Question Body */}
      <div className="p-5 space-y-4">
        <RichTextRenderer
          text={question.text}
          code={question.code}
          table={question.table}
          link={question.link}
          driveImageId={question.driveImageId}
        />

        {/* INPUT AREA: SINGLE CHOICE */}
        {question.type === 'single' && question.options && (
          <div className="space-y-2.5 pt-2">
            {question.options.map((opt) => {
              const selectedArray = Array.isArray(userAnswer)
                ? userAnswer
                : userAnswer
                ? [userAnswer]
                : [];
              const isSelected = selectedArray.includes(opt.id);
              const isCorrectOpt = question.correctAnswers.includes(opt.id);

              let optionStyle = 'border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-800';
              let badgeIcon = null;

              if (isReview) {
                if (isCorrectOpt) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium ring-1 ring-emerald-500';
                  badgeIcon = <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />;
                } else if (isSelected && !isCorrectOpt) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-800 line-through opacity-85';
                  badgeIcon = <XCircle size={18} className="text-rose-600 shrink-0" />;
                } else {
                  optionStyle = 'border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600';
              }

              return (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border transition-all ${optionStyle} ${
                    isReview ? 'cursor-default' : ''
                  }`}
                >
                  <div className="flex items-center h-5 mt-0.5 shrink-0">
                    <input
                      type="radio"
                      name={`q-${qId}`}
                      checked={isSelected}
                      disabled={isReview}
                      onChange={() => handleSingleSelect(opt.id)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                  </div>
                  <div className="flex-1 text-sm sm:text-base select-none leading-relaxed">
                    <span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>
                    {opt.text}
                  </div>
                  {badgeIcon}
                </label>
              );
            })}
          </div>
        )}

        {/* INPUT AREA: MULTIPLE CHOICE */}
        {question.type === 'multiple' && question.options && (
          <div className="space-y-2.5 pt-2">
            {question.options.map((opt) => {
              const selectedArray = Array.isArray(userAnswer)
                ? userAnswer
                : userAnswer
                ? [userAnswer]
                : [];
              const isSelected = selectedArray.includes(opt.id);
              const isCorrectOpt = question.correctAnswers.includes(opt.id);

              let optionStyle = 'border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-800';
              let badgeIcon = null;

              if (isReview) {
                if (isCorrectOpt) {
                  optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium ring-1 ring-emerald-500';
                  badgeIcon = <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />;
                } else if (isSelected && !isCorrectOpt) {
                  optionStyle = 'bg-rose-50 border-rose-400 text-rose-800 line-through opacity-85';
                  badgeIcon = <XCircle size={18} className="text-rose-600 shrink-0" />;
                } else {
                  optionStyle = 'border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600';
              }

              return (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border transition-all ${optionStyle} ${
                    isReview ? 'cursor-default' : ''
                  }`}
                >
                  <div className="flex items-center h-5 mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isReview}
                      onChange={() => handleMultipleSelect(opt.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                    />
                  </div>
                  <div className="flex-1 text-sm sm:text-base select-none leading-relaxed">
                    <span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>
                    {opt.text}
                  </div>
                  {badgeIcon}
                </label>
              );
            })}
          </div>
        )}

        {/* INPUT AREA: FILL IN THE BLANK */}
        {question.type === 'fill' && (
          <div className="pt-2 space-y-2">
            <input
              type="text"
              value={typeof userAnswer === 'string' ? userAnswer : ''}
              disabled={isReview}
              onChange={(e) => handleFillChange(e.target.value)}
              placeholder="Nhập câu trả lời của bạn vào đây..."
              className={`w-full p-3 text-sm sm:text-base border rounded-lg outline-none transition-all ${
                isReview
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                    : 'bg-rose-50 border-rose-400 text-rose-900 font-semibold'
                  : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
              }`}
            />
            {isReview && !isCorrect && (
              <div className="mt-2 text-xs sm:text-sm text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Đáp án chuẩn:{' '}
                  <strong>{question.correctAnswers.join(' hoặc ')}</strong>
                </span>
              </div>
            )}
          </div>
        )}

        {/* INPUT AREA: DROPDOWN */}
        {question.type === 'dropdown' && question.options && (
          <div className="pt-2 space-y-3">
            <p className="text-xs text-slate-500 font-medium">Chọn đáp án tương ứng cho từng vị trí:</p>
            {question.correctAnswers.map((_, slotIdx) => {
              const userVal = Array.isArray(userAnswer) ? userAnswer[slotIdx] || '' : '';
              const correctTarget = question.correctAnswers[slotIdx];
              const isSlotCorrect = isReview && userVal.toLowerCase() === String(correctTarget).toLowerCase();

              return (
                <div key={slotIdx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-700 w-16 shrink-0">
                    Vị trí [{slotIdx + 1}]:
                  </span>
                  <select
                    disabled={isReview}
                    value={userVal}
                    onChange={(e) => handleDropdownChange(slotIdx, e.target.value)}
                    className={`flex-1 p-2.5 rounded-lg border text-sm outline-none transition-colors ${
                      isReview
                        ? isSlotCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-medium'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                    }`}
                  >
                    <option value="">-- Chọn đáp án --</option>
                    {question.options?.map((opt, oIdx) => (
                      <option key={opt.id} value={opt.id}>
                        {oIdx + 1}. {opt.text}
                      </option>
                    ))}
                  </select>
                  {isReview && !isSlotCorrect && (
                    <span className="text-xs text-emerald-700 font-medium sm:ml-2">
                      Đáp án đúng: vị trí {Number(correctTarget) + 1 || correctTarget}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* INPUT AREA: ESSAY */}
        {question.type === 'essay' && (
          <div className="pt-2 space-y-3">
            <textarea
              rows={5}
              value={typeof userAnswer === 'string' ? userAnswer : ''}
              disabled={isReview}
              onChange={(e) => handleEssayChange(e.target.value)}
              placeholder="Nhập câu trả lời hoặc phân tích tự luận của bạn vào đây..."
              className="w-full p-3.5 text-sm sm:text-base border border-slate-300 rounded-lg outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 leading-relaxed disabled:bg-slate-50 disabled:text-slate-800"
            />
            {isReview && question.correctAnswers.length > 0 && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                <h4 className="font-bold text-sm text-blue-900 flex items-center gap-1.5">
                  <BookOpen size={16} /> Lời giải / Model Answer tham khảo:
                </h4>
                <div className="text-sm text-blue-950">
                  <RichTextRenderer text={question.correctAnswers.join('\n\n')} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Mode: Explanation and Suggestions */}
      {isReview && (
        <div className={`px-5 py-4 border-t border-slate-200 text-sm ${isCorrect ? 'bg-emerald-50/40' : 'bg-slate-50'}`}>
          {question.explanation && (
            <div className="mb-2">
              <p className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                💡 Giải thích chi tiết:
              </p>
              <div className="text-slate-700 leading-relaxed">
                <RichTextRenderer text={question.explanation} />
              </div>
            </div>
          )}

          {question.suggestion && !isCorrect && question.type !== 'essay' && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs sm:text-sm flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong className="block font-semibold">Gợi ý ôn tập:</strong>
                {question.suggestion}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
