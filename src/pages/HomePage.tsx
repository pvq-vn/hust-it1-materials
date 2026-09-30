import React, { useState } from 'react';
import { SUBJECT_CATALOG } from '../data/subjectCatalog';
import { Subject } from '../types/quiz';
import { BookOpen, Search, Sparkles, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';

interface HomePageProps {
  onSelectSubject: (subject: Subject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectSubject }) => {
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const semesters = ['all', '2026.2', '2026.1', '2025.2'];

  const filteredSubjects = SUBJECT_CATALOG.filter((subj) => {
    const matchesSemester =
      selectedSemester === 'all' || subj.semester === selectedSemester;
    const matchesSearch =
      subj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subj.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs font-semibold text-rose-300">
            <Sparkles size={14} />
            <span>Ngân hàng đề thi trắc nghiệm & tự luận CNTT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            HUST IT1 QUIZ ENGINE
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Ôn luyện kiến thức, thi thử trắc nghiệm & tự luận các môn chuyên ngành Công nghệ thông tin Đại học Bách Khoa Hà Nội. Tích hợp giải thích chi tiết, đồng hồ bấm giờ và phân tích kết quả tức thì.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              ✓ 15+ Môn học chuyên ngành
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              ✓ 4.500+ Câu hỏi có đáp án & giải thích
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              ✓ Hỗ trợ tái tạo đề bằng Seed
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Semester Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
          {semesters.map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => setSelectedSemester(sem)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedSemester === sem
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {sem === 'all' ? 'Tất cả kỳ học' : `Học kỳ ${sem}`}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã môn hoặc tên môn..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-600 shadow-sm transition-all"
          />
        </div>
      </section>

      {/* Subject Cards Grid */}
      <section>
        {filteredSubjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen size={40} className="text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">Không tìm thấy môn học phù hợp</h3>
            <p className="text-xs text-slate-500 mt-1">
              Thử tìm kiếm với từ khóa khác hoặc chọn &quot;Tất cả kỳ học&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((subj) => (
              <div
                key={subj.id}
                onClick={() => onSelectSubject(subj)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-500 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-mono font-bold">
                      {subj.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      Kỳ {subj.semester}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    {subj.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {subj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Layers size={14} className="text-slate-400" />
                    <span>{subj.examFiles.length} nguồn đề</span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Làm bài thi <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
