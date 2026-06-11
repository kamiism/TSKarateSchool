import {
  Users,
  FileQuestion,
  CalendarDays,
  TrendingUp,
  Activity,
} from 'lucide-react';

// Mock data
const stats = [
  { label: 'Total Students', value: '48', icon: Users, accent: false },
  { label: 'Quizzes Conducted', value: '3', icon: FileQuestion, accent: false },
  { label: 'Upcoming Events', value: '5', icon: CalendarDays, accent: false },
  { label: 'Avg Attendance', value: '78%', icon: TrendingUp, accent: true },
];

const beltDistribution = [
  { belt: 'White Belt', color: '#F5F5F5', borderColor: '#999', count: 12 },
  { belt: 'Yellow Belt', color: '#FFD700', borderColor: '#DAA520', count: 10 },
  { belt: 'Orange Belt', color: '#FF8C00', borderColor: '#CC7000', count: 8 },
  { belt: 'Green Belt', color: '#228B22', borderColor: '#1A6B1A', count: 7 },
  { belt: 'Blue Belt', color: '#1E90FF', borderColor: '#0B6EC5', count: 5 },
  { belt: 'Brown Belt', color: '#8B4513', borderColor: '#6B3410', count: 4 },
  { belt: 'Black Belt', color: '#000505', borderColor: '#3B3355', count: 2 },
];

const recentActivity = [
  { id: 1, text: 'Arjun Sharma scored 5/5 on Daily Kata Terminology', time: '2 hours ago', type: 'quiz' },
  { id: 2, text: 'Priya Patel promoted to Green Belt', time: '5 hours ago', type: 'belt' },
  { id: 3, text: 'New student Rohan Mehta registered', time: '1 day ago', type: 'student' },
  { id: 4, text: 'Belt Grading Exam event created', time: '1 day ago', type: 'event' },
  { id: 5, text: 'Sneha Gupta scored 4/5 on Basic Stances Review', time: '2 days ago', type: 'quiz' },
];

const maxCount = Math.max(...beltDistribution.map(b => b.count));

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
          // Overview
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
          Admin<br />Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`border-3 border-brand-black p-6 transition-all duration-200
                         hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal
                         ${stat.accent ? 'bg-brand-black text-brand-white' : 'bg-brand-white'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`font-mono text-[0.7rem] tracking-[0.15em] uppercase ${stat.accent ? 'text-brand-ice' : 'text-brand-muted'}`}>
                  {stat.label}
                </span>
                <Icon size={20} strokeWidth={2.5} className={stat.accent ? 'text-brand-ice' : 'text-brand-purple'} />
              </div>
              <span className={`font-mono text-4xl font-bold block ${stat.accent ? 'text-brand-white' : 'text-brand-black'}`}>
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Belt Distribution */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
            Belt Distribution
          </h3>
          <div className="space-y-3">
            {beltDistribution.map((belt) => (
              <div key={belt.belt} className="flex items-center gap-3">
                <div
                  className="w-6 h-3 border flex-shrink-0"
                  style={{ backgroundColor: belt.color, borderColor: belt.borderColor }}
                />
                <span className="font-mono text-xs text-brand-muted w-24 flex-shrink-0 uppercase tracking-wider">
                  {belt.belt.replace(' Belt', '')}
                </span>
                <div className="flex-1 h-5 border border-brand-ice/40 bg-brand-ice/10 relative">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${(belt.count / maxCount) * 100}%`,
                      backgroundColor: belt.borderColor,
                    }}
                  />
                </div>
                <span className="font-mono text-sm font-bold text-brand-black w-8 text-right">
                  {belt.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2 flex items-center gap-2">
            <Activity size={16} strokeWidth={2.5} />
            Recent Activity
          </h3>
          <div className="space-y-0">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 py-3 border-b border-brand-ice/20 last:border-none"
              >
                <div className={`w-2 h-2 mt-1.5 flex-shrink-0 ${
                  item.type === 'quiz' ? 'bg-brand-purple' :
                  item.type === 'belt' ? 'bg-[#FFD700]' :
                  item.type === 'student' ? 'bg-[#228B22]' :
                  'bg-brand-ice'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-black leading-snug">{item.text}</p>
                  <span className="font-mono text-[0.6rem] text-brand-muted tracking-wider uppercase mt-0.5 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
