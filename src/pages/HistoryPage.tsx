import React, { useState, useEffect } from 'react';
import { historyService } from '../services/historyService';
import { authService, UserProfile } from '../services/authService';
import { QuizAttempt } from '../types/quiz';
import { History, Eye, RefreshCw, Calendar, Clock, Award, Trash2 } from 'lucide-react';

interface HistoryPageProps {
  onReopenAttempt: (attempt: QuizAttempt) => void;
  onNavigateHome: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onReopenAttempt,
  onNavigateHome,
}) => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser().then((u) => {
      if (!isMounted) return;
      setUser(u);
      historyService.getAttempts(u?.id).then((data) => {
        if (!isMounted) return;
        setAttempts(data);
        setLoading(false);
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử trên thiết bị này?')) {
      historyService.clearLocalHistory();
      setAttempts([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <History size={26} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Lịch sử làm bài thi
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {user ? `Tài khoản: ${user.fullName || user.email}` : 'Chế độ khách (Lưu trên trình duyệt)'}
            </p>
          </div>
        </div>

        {attempts.length > 0 && (
          <button
            type="button"
            onClick={handleClearHistory}
            className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 size={14} /> Xóa lịch sử
          </button>
        )}
      </div>

      {/* Attempts List */}
      {loading ? (
        <div className="p-12 text-center text-sm text-slate-500 bg-white rounded-2xl border border-slate-200">
          Đang tải lịch sử...
        </div>
      ) : attempts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Award size={48} className="text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">Chưa có bài thi nào</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy bắt đầu làm một bài kiểm tra để theo dõi tiến độ và xem lại kết quả chi tiết tại đây.
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
          >
            Làm bài ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((attempt) => (
            <div
              key={attempt.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono font-bold text-xs">
                    {attempt.subjectCode}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">
                    {attempt.subjectName}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {formatDate(attempt.submittedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {formatSeconds(attempt.timeSpentSeconds)}
                  </span>
                  <span>
                    Mã đề: <strong className="font-mono text-slate-700">{attempt.seed}</strong>
                  </span>
                </div>

                <div className="text-xs text-slate-600 pt-0.5">
                  Đúng <strong>{attempt.correctCount}</strong> / {attempt.totalScoredQuestions} câu trắc nghiệm
                  {attempt.essayCount > 0 && ` + ${attempt.essayCount} câu tự luận`}
                </div>
              </div>

              {/* Score and Action */}
              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <div
                    className={`text-2xl sm:text-3xl font-black ${
                      attempt.score10 >= 8
                        ? 'text-emerald-600'
                        : attempt.score10 >= 5
                        ? 'text-blue-600'
                        : 'text-rose-600'
                    }`}
                  >
                    {attempt.score10.toFixed(2)}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Điểm / 10
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onReopenAttempt(attempt)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Eye size={14} /> Xem lại
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
