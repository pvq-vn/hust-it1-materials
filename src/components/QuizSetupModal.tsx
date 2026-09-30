import React, { useState, useEffect } from 'react';
import { Subject, QuizConfig, TimeMode } from '../types/quiz';
import { getExamStats, ExamStats } from '../data/dataLoader';
import { generateSeed } from '../engine/shuffle';
import { Play, Sparkles, Shuffle, Clock, FileText, CheckCircle2, RotateCw } from 'lucide-react';

interface QuizSetupModalProps {
  subject: Subject;
  initialSeed?: string;
  onStartQuiz: (config: QuizConfig) => void;
  onCancel: () => void;
}

export const QuizSetupModal: React.FC<QuizSetupModalProps> = ({
  subject,
  initialSeed,
  onStartQuiz,
  onCancel,
}) => {
  const defaultFile = subject.examFiles.find((f) => f.isDefault) || subject.examFiles[0];
  const [selectedFile, setSelectedFile] = useState(defaultFile.filePath);
  const [stats, setStats] = useState<ExamStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // Configuration options
  const [mcqCount, setMcqCount] = useState<number>(40);
  const [essayCount, setEssayCount] = useState<number>(0);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [timeMode, setTimeMode] = useState<TimeMode>('auto');
  const [seed, setSeed] = useState<string>(initialSeed || generateSeed());

  // Load stats whenever selected exam file changes
  useEffect(() => {
    let isMounted = true;
    setLoadingStats(true);
    setStatsError(null);

    getExamStats(selectedFile)
      .then((res) => {
        if (isMounted) {
          setStats(res);
          setLoadingStats(false);
          // Set sensible defaults based on loaded counts
          if (res.mcqCount > 0) {
            setMcqCount(Math.min(40, res.mcqCount));
          } else {
            setMcqCount(0);
          }
          if (res.essayCount > 0) {
            setEssayCount(Math.min(2, res.essayCount));
          } else {
            setEssayCount(0);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          setStatsError((err as Error).message);
          setLoadingStats(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFile]);

  // Compute calculated duration in minutes
  const totalQuestions = mcqCount + essayCount;
  const calculatedMinutes = Math.max(15, Math.ceil((totalQuestions * 1.5) / 5) * 5);

  const handleStart = () => {
    onStartQuiz({
      subjectId: subject.id,
      examFilePath: selectedFile,
      mcqCount,
      essayCount,
      shuffleQuestions,
      shuffleOptions,
      timeMode,
      customMinutes: timeMode === 'auto' ? calculatedMinutes : undefined,
      seed: seed.trim().toUpperCase() || generateSeed(),
    });
  };

  const mcqPresets = [10, 20, 40, 60];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-blue-600 rounded-md text-xs font-mono font-bold tracking-wider">
              {subject.code}
            </span>
            <span className="text-xs text-slate-400">Học kỳ {subject.semester}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-2 text-white">
            {subject.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            {subject.description || 'Cấu hình bộ câu hỏi và thời gian làm bài kiểm tra.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* File selector if course has multiple banks */}
          {subject.examFiles.length > 1 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Chọn nguồn đề thi / ngân hàng câu hỏi
              </label>
              <select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 font-medium outline-none focus:border-blue-600"
              >
                {subject.examFiles.map((f) => (
                  <option key={f.filePath} value={f.filePath}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Loading or Stats Banner */}
          {loadingStats ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm text-slate-500 animate-pulse">
              Đang phân tích ngân hàng câu hỏi...
            </div>
          ) : statsError ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {statsError}
            </div>
          ) : stats ? (
            <div className="flex items-center justify-between p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-blue-600 shrink-0" />
                <span>
                  Tổng ngân hàng: <strong>{stats.totalCount} câu</strong> (
                  {stats.mcqCount} trắc nghiệm, {stats.essayCount} tự luận)
                </span>
              </div>
            </div>
          ) : null}

          {/* MCQ Count Selection */}
          {stats && stats.mcqCount > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Số câu trắc nghiệm
                </label>
                <span className="text-xs font-semibold text-blue-600">
                  {mcqCount} câu
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mcqPresets.map((count) => {
                  if (count > (stats?.mcqCount || 0)) return null;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMcqCount(count)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                        mcqCount === count
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {count} câu
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setMcqCount(stats.mcqCount)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                    mcqCount === stats.mcqCount
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  Tất cả ({stats.mcqCount})
                </button>
              </div>
            </div>
          )}

          {/* Essay Count Selection */}
          {stats && stats.essayCount > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Số câu tự luận (Không chấm tự động)
                </label>
                <span className="text-xs font-semibold text-blue-600">
                  {essayCount} câu
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 5].map((count) => {
                  if (count > (stats?.essayCount || 0)) return null;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setEssayCount(count)}
                      className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                        essayCount === count
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {count} câu
                    </button>
                  );
                })}
                {stats.essayCount > 5 && (
                  <button
                    type="button"
                    onClick={() => setEssayCount(stats.essayCount)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all ${
                      essayCount === stats.essayCount
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Tất cả ({stats.essayCount})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Shuffle Options */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) => setShuffleQuestions(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
              />
              <span className="text-sm font-medium text-slate-800 flex items-center gap-2">
                <Shuffle size={15} className="text-slate-500" /> Xáo trộn thứ tự câu hỏi (Fisher-Yates)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) => setShuffleOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
              />
              <span className="text-sm font-medium text-slate-800 flex items-center gap-2">
                <Shuffle size={15} className="text-slate-500" /> Xáo trộn thứ tự đáp án A/B/C/D
              </span>
            </label>
          </div>

          {/* Time Limit Setting */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Thời gian làm bài
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { mode: 'auto', label: `Tự động (${calculatedMinutes} phút)` },
                { mode: 'unlimited', label: 'Không giới hạn' },
                { mode: '15', label: '15 phút' },
                { mode: '30', label: '30 phút' },
                { mode: '45', label: '45 phút' },
                { mode: '60', label: '60 phút' },
              ].map((item) => (
                <button
                  key={item.mode}
                  type="button"
                  onClick={() => setTimeMode(item.mode as TimeMode)}
                  className={`p-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all text-left flex items-center gap-2 ${
                    timeMode === item.mode
                      ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Clock size={14} className={timeMode === item.mode ? 'text-blue-600' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Seed Input */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Mã đề / Seed tái lập
              </label>
              <button
                type="button"
                onClick={() => setSeed(generateSeed())}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCw size={12} /> Tạo mã ngẫu nhiên
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value.toUpperCase())}
                maxLength={10}
                placeholder="VD: A7F3K2"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-bold tracking-widest text-slate-800 uppercase focus:border-blue-600 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Nhập mã đề cũ để tái tạo chính xác cùng bộ câu hỏi và thứ tự đề thi.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-sm transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            disabled={loadingStats || totalQuestions <= 0}
            onClick={handleStart}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow transition-all flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" /> BẮT ĐẦU LÀM BÀI ({totalQuestions} CÂU)
          </button>
        </div>
      </div>
    </div>
  );
};
