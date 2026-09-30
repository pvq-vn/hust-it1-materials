import React, { useState, useEffect } from 'react';
import { Subject, QuizConfig, QuizAttempt } from './types/quiz';
import { SUBJECT_CATALOG } from './data/subjectCatalog';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { HistoryPage } from './pages/HistoryPage';
import { AdminReportsPage } from './pages/AdminReportsPage';
import { QuizSetupModal } from './components/QuizSetupModal';
import { AuthModal } from './components/AuthModal';
import { draftService, QuizDraft } from './services/draftService';
import { authService, UserProfile } from './services/authService';
import { AlertCircle, Play, Trash2, ArrowRight } from 'lucide-react';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'quiz' | 'history' | 'admin'>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Setup modal state
  const [setupSubject, setSetupSubject] = useState<Subject | null>(null);
  const [setupSeed, setSetupSeed] = useState<string | undefined>(undefined);

  // Active quiz session state
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeConfig, setActiveConfig] = useState<QuizConfig | null>(null);
  const [reopenAttempt, setReopenAttempt] = useState<QuizAttempt | null>(null);

  // Draft state check
  const [activeDraft, setActiveDraft] = useState<QuizDraft | null>(null);

  // Initialize Auth & Draft check
  useEffect(() => {
    authService.getCurrentUser().then(setCurrentUser);
    const unsubscribe = authService.onAuthStateChange(setCurrentUser);

    const draft = draftService.getDraft();
    if (draft) {
      setActiveDraft(draft);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  // Parse URL hash for direct links e.g. #/quiz/IT3080?seed=A7F3K2
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/history')) {
        setCurrentRoute('history');
      } else if (hash.startsWith('#/admin')) {
        setCurrentRoute('admin');
      } else if (hash.startsWith('#/quiz/')) {
        const parts = hash.replace('#/quiz/', '').split('?');
        const subjectCode = parts[0];
        const params = new URLSearchParams(parts[1] || '');
        const targetSubject = SUBJECT_CATALOG.find(
          (s) => s.code.toLowerCase() === subjectCode.toLowerCase()
        );

        if (targetSubject) {
          const seedParam = params.get('seed') || undefined;
          setSetupSubject(targetSubject);
          setSetupSeed(seedParam);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle starting a new quiz from configuration
  const handleStartQuiz = (config: QuizConfig) => {
    const subject = SUBJECT_CATALOG.find((s) => s.id === config.subjectId);
    if (!subject) return;

    setSetupSubject(null);
    setReopenAttempt(null);
    setActiveSubject(subject);
    setActiveConfig(config);
    setCurrentRoute('quiz');
    setActiveDraft(null);

    // Update URL hash
    window.location.hash = `#/quiz/${subject.code}?seed=${config.seed}`;
  };

  // Resume draft quiz
  const handleResumeDraft = () => {
    if (!activeDraft) return;

    const subject = SUBJECT_CATALOG.find((s) => s.id === activeDraft.subjectId);
    if (!subject) return;

    setReopenAttempt(null);
    setActiveSubject(subject);
    setActiveConfig(activeDraft.config);
    setCurrentRoute('quiz');
    setActiveDraft(null);

    window.location.hash = `#/quiz/${subject.code}?seed=${activeDraft.config.seed}`;
  };

  // Discard draft
  const handleDiscardDraft = () => {
    draftService.clearDraft();
    setActiveDraft(null);
  };

  // Reopen previous attempt in review mode
  const handleReopenAttempt = (attempt: QuizAttempt) => {
    const subject = SUBJECT_CATALOG.find((s) => s.id === attempt.subjectId);
    if (!subject) return;

    setActiveSubject(subject);
    setActiveConfig(attempt.config);
    setReopenAttempt(attempt);
    setCurrentRoute('quiz');

    window.location.hash = `#/quiz/${subject.code}?seed=${attempt.seed}&review=true`;
  };

  // Exit quiz and return home
  const handleExitQuiz = () => {
    setCurrentRoute('home');
    setActiveSubject(null);
    setActiveConfig(null);
    setReopenAttempt(null);
    window.location.hash = '#/';
  };

  // Retry with same seed
  const handleRetryWithSameSeed = () => {
    if (!activeConfig || !activeSubject) return;
    setReopenAttempt(null);
    // Restart quiz with identical seed & config
    handleStartQuiz({ ...activeConfig });
  };

  const handleNavigate = (route: 'home' | 'history' | 'admin') => {
    setCurrentRoute(route);
    if (route === 'home') window.location.hash = '#/';
    if (route === 'history') window.location.hash = '#/history';
    if (route === 'admin') window.location.hash = '#/admin';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        currentUser={currentUser}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* In-Progress Draft Banner (Section 25 Requirement) */}
      {activeDraft && currentRoute !== 'quiz' && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2.5 shadow-sm text-xs sm:text-sm font-medium">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="shrink-0" />
              <span>
                Bạn đang có bài làm dở môn <strong>{activeDraft.subjectCode} - {activeDraft.subjectName}</strong> ({activeDraft.questions.length} câu).
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResumeDraft}
                className="px-3 py-1 bg-slate-950 hover:bg-slate-900 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <Play size={12} fill="currentColor" /> Tiếp tục làm
              </button>
              <button
                type="button"
                onClick={handleDiscardDraft}
                className="px-3 py-1 bg-white/80 hover:bg-white text-slate-900 rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <Trash2 size={12} /> Hủy bài dở
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentRoute === 'home' && (
          <HomePage
            onSelectSubject={(subject) => {
              setSetupSubject(subject);
              setSetupSeed(undefined);
            }}
          />
        )}

        {currentRoute === 'quiz' && activeSubject && activeConfig && (
          <QuizPage
            subject={activeSubject}
            config={activeConfig}
            initialAttempt={reopenAttempt}
            onExit={handleExitQuiz}
            onRetryWithSameSeed={handleRetryWithSameSeed}
          />
        )}

        {currentRoute === 'history' && (
          <HistoryPage
            onReopenAttempt={handleReopenAttempt}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'admin' && <AdminReportsPage />}
      </div>

      {/* Quiz Configuration Modal */}
      {setupSubject && (
        <QuizSetupModal
          subject={setupSubject}
          initialSeed={setupSeed}
          onStartQuiz={handleStartQuiz}
          onCancel={() => setSetupSubject(null)}
        />
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            HUST IT1 QUIZ — Hệ thống luyện thi trắc nghiệm & tự luận CNTT HUST
          </p>
          <p>
            Dữ liệu câu hỏi được lưu giữ nguyên bản (Read-only) từ kho tài liệu <code>pvq-vn/hust-it1-materials</code>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
