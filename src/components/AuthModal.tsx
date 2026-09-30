import React, { useState } from 'react';
import { authService, UserProfile } from '../services/authService';
import { isSupabaseConfigured } from '../services/supabase';
import { X, Lock, Mail, User, ShieldCheck, Info } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let user: UserProfile;
      if (isRegister) {
        user = await authService.register(email, password, fullName);
      } else {
        user = await authService.login(email, password);
      }
      onSuccess(user);
      onClose();
    } catch (err) {
      setError((err as Error).message || 'Xác thực không thành công.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Lưu trữ kết quả thi và đồng bộ lịch sử làm đề
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Supabase status notice */}
        {!isSupabaseConfigured && (
          <div className="mx-5 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>Chế độ Offline / Local:</strong> Supabase chưa được cấu hình key trong <code>.env</code>. Tài khoản và lịch sử sẽ được lưu trực tiếp trên trình duyệt của bạn một cách an toàn.
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Họ và tên
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@sis.hust.edu.vn"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg text-sm shadow-sm transition-colors mt-2"
          >
            {loading ? 'Đang xử lý...' : isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}
          </button>

          <div className="text-center pt-2 text-xs text-slate-500">
            {isRegister ? (
              <>
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Đăng nhập ngay
                </button>
              </>
            ) : (
              <>
                Chưa có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Đăng ký tài khoản mới
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
