import React, { useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerDisplayProps {
  timeRemaining: number;
  totalDuration: number;
  isPaused: boolean;
  onTimeUpdate: (seconds: number) => void;
  onTimeUp: () => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeRemaining,
  totalDuration,
  isPaused,
  onTimeUpdate,
  onTimeUp,
}) => {
  useEffect(() => {
    if (isPaused || totalDuration <= 0) return;

    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      onTimeUpdate(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isPaused, totalDuration, onTimeUpdate, onTimeUp]);

  // Format seconds to MM:SS or HH:MM:SS
  const formatTime = (secs: number) => {
    if (secs < 0) return '00:00';
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const isLowTime = timeRemaining <= 300 && timeRemaining > 0; // Under 5 minutes
  const isCriticalTime = timeRemaining <= 60 && timeRemaining > 0; // Under 1 minute

  if (totalDuration <= 0) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
        <Clock size={16} />
        <span>Không giới hạn thời gian</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono font-bold text-sm sm:text-base border transition-colors ${
        isCriticalTime
          ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
          : isLowTime
          ? 'bg-amber-50 text-amber-700 border-amber-300'
          : 'bg-blue-50 text-blue-700 border-blue-200'
      }`}
      title="Thời gian làm bài còn lại"
    >
      {isCriticalTime ? <AlertTriangle size={18} /> : <Clock size={18} />}
      <span>{formatTime(timeRemaining)}</span>
    </div>
  );
};
