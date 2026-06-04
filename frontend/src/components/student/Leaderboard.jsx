import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Medal } from 'lucide-react';

// Placeholder leaderboard data — will be replaced with API data
const leaderboardData = [
  { rank: 1, name: 'Priya Patel', belt: 'Green Belt', beltColor: '#228B22', attendance: 58, totalDays: 60, quizPoints: 950 },
  { rank: 2, name: 'Rahul Kumar', belt: 'Blue Belt', beltColor: '#1E90FF', attendance: 55, totalDays: 60, quizPoints: 880 },
  { rank: 3, name: 'Arjun Sharma', belt: 'Orange Belt', beltColor: '#FF8C00', attendance: 42, totalDays: 60, quizPoints: 780 },
  { rank: 4, name: 'Sneha Gupta', belt: 'Yellow Belt', beltColor: '#FFD700', attendance: 50, totalDays: 60, quizPoints: 720 },
  { rank: 5, name: 'Vikram Singh', belt: 'Orange Belt', beltColor: '#FF8C00', attendance: 48, totalDays: 60, quizPoints: 690 },
  { rank: 6, name: 'Ananya Joshi', belt: 'White Belt', beltColor: '#F5F5F5', attendance: 45, totalDays: 60, quizPoints: 650 },
  { rank: 7, name: 'Karthik Nair', belt: 'Yellow Belt', beltColor: '#FFD700', attendance: 40, totalDays: 60, quizPoints: 600 },
  { rank: 8, name: 'Divya Reddy', belt: 'White Belt', beltColor: '#F5F5F5', attendance: 38, totalDays: 60, quizPoints: 550 },
];

export default function Leaderboard({ currentStudentRank }) {
  const [sortBy, setSortBy] = useState('quizPoints');
  const sectionRef = useScrollReveal();

  const sorted = [...leaderboardData].sort((a, b) => {
    if (sortBy === 'quizPoints') return b.quizPoints - a.quizPoints;
    return b.attendance - a.attendance;
  }).map((item, i) => ({ ...item, rank: i + 1 }));

  const getRankBadge = (rank) => {
    if (rank === 1) return <Medal size={20} strokeWidth={2.5} color="#FFD700" />;
    if (rank === 2) return <Medal size={20} strokeWidth={2.5} color="#C0C0C0" />;
    if (rank === 3) return <Medal size={20} strokeWidth={2.5} color="#CD7F32" />;
    return `#${rank}`;
  };

  return (
    <section id="leaderboard" className="py-16 bg-brand-black text-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <span className="reveal font-mono text-xs tracking-[0.2em] uppercase text-brand-ice mb-3 block">
          // Leaderboard
        </span>
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-brand-white">
            Top<br />Performers
          </h2>

          {/* Sort Toggle */}
          <div className="flex border-2 border-brand-ice/30">
            <button
              onClick={() => setSortBy('quizPoints')}
              className={`font-mono text-[0.7rem] font-bold uppercase tracking-wider px-5 py-2 cursor-pointer
                         border-none transition-all duration-200 ${
                sortBy === 'quizPoints'
                  ? 'bg-brand-purple text-brand-white'
                  : 'bg-transparent text-brand-ice hover:text-brand-white'
              }`}
            >
              Quiz Points
            </button>
            <button
              onClick={() => setSortBy('attendance')}
              className={`font-mono text-[0.7rem] font-bold uppercase tracking-wider px-5 py-2 cursor-pointer
                         border-none border-l-2 border-brand-ice/30 transition-all duration-200 ${
                sortBy === 'attendance'
                  ? 'bg-brand-purple text-brand-white'
                  : 'bg-transparent text-brand-ice hover:text-brand-white'
              }`}
            >
              Attendance
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="reveal reveal-delay-1 border-2 border-brand-ice/20 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-brand-ice/20">
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4 w-16">Rank</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Student</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Belt</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-center py-3 px-4">Attendance</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-right py-3 px-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => {
                const isCurrentUser = entry.rank === currentStudentRank;
                return (
                  <tr
                    key={entry.name}
                    className={`border-b border-brand-ice/10 transition-colors duration-200
                               ${isCurrentUser
                                 ? 'bg-brand-purple/20 border-l-4 border-l-brand-purple'
                                 : 'hover:bg-brand-white/5'
                               }`}
                  >
                    <td className="py-3.5 px-4">
                      <span className={`font-mono font-bold ${entry.rank <= 3 ? 'text-xl' : 'text-sm text-brand-muted'}`}>
                        {getRankBadge(entry.rank)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-sm text-brand-white">
                        {entry.name}
                        {isCurrentUser && (
                          <span className="ml-2 font-mono text-[0.6rem] tracking-wider uppercase text-brand-ice bg-brand-purple/40 px-2 py-0.5">
                            You
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-3 border border-brand-ice/30" style={{ backgroundColor: entry.beltColor }} />
                        <span className="font-mono text-xs text-brand-ice">{entry.belt}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono text-sm text-brand-ice">
                        {entry.attendance}/{entry.totalDays}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono text-sm font-bold text-brand-white">{entry.quizPoints}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
