import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Trophy } from 'lucide-react';

export default function Dashboard({ student }) {
  const sectionRef = useScrollReveal();
  const attendancePercent = Math.round((student.daysPresent / student.totalDays) * 100);

  // Circumference for the progress ring (radius = 54)
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attendancePercent / 100) * circumference;

  return (
    <section id="dashboard" className="py-16 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        {/* Welcome */}
        <div className="reveal mb-10">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
            // Student Dashboard
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Welcome back,<br />
            <span className="text-brand-purple">{student.name}</span>
          </h1>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Attendance Card — Large */}
          <div className="reveal reveal-delay-1 md:col-span-2 border-3 border-brand-black p-8 bg-brand-white
                          transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-3">
                  Quiz-Based Attendance
                </span>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-mono text-5xl font-bold text-brand-black">{student.daysPresent}</span>
                  <span className="font-mono text-xl text-brand-muted">/ {student.totalDays}</span>
                </div>
                <span className="font-mono text-sm text-brand-muted">Days Present</span>

                {/* Progress bar */}
                <div className="mt-4 w-full max-w-[280px] h-3 border-2 border-brand-black bg-brand-ice/30">
                  <div
                    className="h-full bg-brand-purple transition-all duration-700"
                    style={{ width: `${attendancePercent}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-brand-muted mt-1 block">{attendancePercent}% attendance rate</span>
              </div>

              {/* Circular Progress */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r={radius} fill="none" stroke="#BFCDE0" strokeWidth="8" opacity="0.3" />
                  <circle
                    cx="60" cy="60" r={radius} fill="none"
                    stroke="#3B3355" strokeWidth="8" strokeLinecap="square"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-2xl font-bold text-brand-black">{attendancePercent}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Points Card */}
          <div className="reveal reveal-delay-2 border-3 border-brand-black p-6 bg-brand-white
                          transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal">
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-3">
              Quiz Points
            </span>
            <span className="font-mono text-4xl font-bold text-brand-black block">{student.quizPoints}</span>
            <span className="font-mono text-xs text-brand-muted mt-1 block">Total Points Earned</span>
            <div className="mt-4 flex items-center gap-2">
              <Trophy size={20} strokeWidth={2.5} className="text-brand-purple" />
              <span className="font-mono text-xs text-brand-purple font-bold uppercase tracking-wider">
                Rank #{student.rank}
              </span>
            </div>
          </div>

          {/* Belt Status Card */}
          <div className="reveal reveal-delay-3 border-3 border-brand-black p-6 bg-brand-black text-brand-white
                          transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal-purple">
            <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-ice block mb-3">
              Current Belt
            </span>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-5 border-2 border-brand-ice" style={{ backgroundColor: student.beltColor }} />
              <span className="font-mono text-xl font-bold">{student.belt}</span>
            </div>
            <span className="font-mono text-xs text-brand-muted block">Keep training to advance!</span>
            <button
              onClick={() => {
                const el = document.getElementById('syllabus');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-brand-ice
                         border-b border-brand-ice pb-0.5 cursor-pointer bg-transparent border-x-0 border-t-0
                         hover:text-brand-white hover:border-brand-white transition-colors"
            >
              View Syllabus →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
