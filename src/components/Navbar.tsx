import React, { useState } from 'react';
import { UserProfile, authService } from '../services/authService';
import { isSupabaseConfigured } from '../services/supabase';
import { GraduationCap, History, ShieldAlert, LogIn, LogOut, User, CheckCircle2, CloudOff } from 'lucide-react';

interface NavbarProps {
  currentUser: UserProfile | null;
  currentRoute: 'home' | 'quiz' | 'history' | 'admin';
  onNavigate: (route: 'home' | 'history' | 'admin') => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRoute,
  onNavigate,
  onOpenAuth,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    setShowDropdown(false);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap size={22} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
              <span>HUST</span>
              <span className="text-red-600 font-black">IT1</span>
              <span className="text-slate-500 font-semibold text-xs sm:text-sm">QUIZ</span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block -mt-1 font-medium">
              Luyện thi trắc nghiệm & tự luận CNTT
            </p>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
              currentRoute === 'home'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Môn học
          </button>

          <button
            type="button"
            onClick={() => onNavigate('history')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentRoute === 'history'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History size={16} />
            <span className="hidden sm:inline">Lịch sử làm bài</span>
          </button>

          {/* Admin Reports link (always visible or highlighted for owner) */}
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              currentRoute === 'admin'
                ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
            }`}
            title="Bảng điều khiển quản lý báo lỗi câu hỏi"
          >
            <ShieldAlert size={16} className="text-rose-500" />
            <span className="hidden sm:inline">Quản lý báo lỗi</span>
          </button>
        </nav>

        {/* Right side: User Account / Auth & Storage status */}
        <div className="flex items-center gap-2">
          {/* Storage Mode indicator */}
          <div
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium border bg-slate-50 text-slate-600 border-slate-200"
            title={
              isSupabaseConfigured
                ? 'Đã kết nối Supabase Cloud Database'
                : 'Chế độ lưu trữ Offline/LocalStorage an toàn'
            }
          >
            {isSupabaseConfigured ? (
              <>
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Supabase Sync</span>
              </>
            ) : (
              <>
                <CloudOff size={12} className="text-amber-500" />
                <span>Local Storage</span>
              </>
            )}
          </div>

          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 bg-white"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {currentUser.fullName || currentUser.email}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 text-xs text-slate-700 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">
                      {currentUser.fullName}
                    </p>
                    <p className="text-slate-500 truncate text-[11px]">
                      {currentUser.email}
                    </p>
                    {currentUser.isAdmin && (
                      <span className="mt-1 inline-block px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold">
                        Quản trị viên (Admin)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowDropdown(false);
                      onNavigate('history');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <History size={14} /> Lịch sử thi
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-medium"
                  >
                    <LogOut size={14} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors"
            >
              <LogIn size={15} />
              <span>Đăng nhập</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
