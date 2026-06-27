import { useState } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  ChevronDown,
  Eye,
  ShieldCheck,
  Bell,
  IndianRupee,
} from 'lucide-react';
import { FEE_STATUS, STATUS_COLORS, allStudentsFees } from '../../data/feeData';
import VerifyPaymentModal from './VerifyPaymentModal';
import StudentFeePanel from './StudentFeePanel';
import Toast from '../Toast';

function StatusBadge({ status }) {
  if (!status) return <span className="font-mono text-xs text-brand-muted">—</span>;
  const color = STATUS_COLORS[status] || '#5D5D81';
  return (
    <span
      className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 border whitespace-nowrap"
      style={{ color, borderColor: color, backgroundColor: `${color}15` }}
    >
      {status}
    </span>
  );
}

const FILTER_TABS = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: FEE_STATUS.PAID },
  { label: 'Pending', value: FEE_STATUS.PENDING },
  { label: 'Overdue', value: FEE_STATUS.OVERDUE },
  { label: 'Awaiting', value: FEE_STATUS.AWAITING },
];

export default function FeeManagement() {
  const [students, setStudents] = useState(allStudentsFees);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  const [verifyStudent, setVerifyStudent] = useState(null);
  const [panelStudent, setPanelStudent] = useState(null);
  const [toast, setToast] = useState(null);

  // Stats
  const totalStudents = students.length;
  const paidCount = students.filter((s) => s.currentMonthStatus === FEE_STATUS.PAID).length;
  const pendingCount = students.filter(
    (s) => s.currentMonthStatus === FEE_STATUS.PENDING || s.currentMonthStatus === FEE_STATUS.OVERDUE
  ).length;
  const awaitingCount = students.filter((s) => s.currentMonthStatus === FEE_STATUS.AWAITING).length;
  const paidPercent = totalStudents > 0 ? Math.round((paidCount / totalStudents) * 100) : 0;

  // Filter & search
  const filtered = students.filter((s) => {
    const matchesFilter = filter === 'all' || s.currentMonthStatus === filter;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleConfirm = (studentId) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, currentMonthStatus: FEE_STATUS.PAID, lastPaid: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) }
          : s
      )
    );
    setVerifyStudent(null);
    setToast('Payment verified and marked as PAID.');
  };

  const handleReject = (studentId) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, currentMonthStatus: FEE_STATUS.PENDING } : s
      )
    );
    setVerifyStudent(null);
    setToast('Payment rejected. Student notified.');
  };

  const handleMarkPaid = (studentId, month) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        const updatedHistory = s.history.map((h) =>
          h.month === month ? { ...h, status: FEE_STATUS.PAID, paidOn: 'Manual' } : h
        );
        const pending = updatedHistory.filter(
          (h) => h.status === FEE_STATUS.PENDING || h.status === FEE_STATUS.OVERDUE
        ).length;
        return { ...s, history: updatedHistory, monthsPending: pending };
      })
    );
    setToast(`Marked ${month} as paid.`);
  };

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: Users, accent: false },
    { label: 'Paid This Month', value: `${paidCount} (${paidPercent}%)`, icon: CheckCircle, accent: false },
    { label: 'Pending', value: pendingCount, icon: AlertTriangle, accent: pendingCount > 0 },
    { label: 'Awaiting Verification', value: awaitingCount, icon: Clock, accent: false },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
          // Fee Management
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
          Fee<br />Payment
        </h1>
      </div>

      {/* Stats */}
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

      {/* Controls */}
      <div className="border-3 border-brand-black p-6 bg-brand-white">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          {/* Month Selector */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border-2 border-brand-black font-mono text-sm bg-brand-white cursor-pointer
                         focus:outline-none focus:shadow-brutal transition-all"
            >
              <option>January 2026</option>
              <option>February 2026</option>
              <option>March 2026</option>
              <option>April 2026</option>
              <option>May 2026</option>
              <option>June 2026</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-0">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-4 py-2 border-2 border-brand-black font-mono text-[0.65rem] font-bold uppercase tracking-wider
                           cursor-pointer transition-all duration-150 -ml-[2px] first:ml-0
                           ${filter === tab.value
                    ? 'bg-brand-black text-brand-white -translate-y-0.5 shadow-[2px_2px_0_var(--color-brand-purple)]'
                    : 'bg-transparent text-brand-muted hover:bg-brand-ice/10 hover:text-brand-black'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative lg:ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student..."
              className="pl-9 pr-4 py-2 border-2 border-brand-black font-mono text-sm bg-brand-white w-full lg:w-56
                         focus:outline-none focus:shadow-brutal transition-all placeholder:text-brand-muted/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border-2 border-brand-black overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-brand-black bg-brand-ice/10">
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Student</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Belt</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Months Pending</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">{selectedMonth.split(' ')[0]}</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Last Paid</th>
                <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-brand-ice/20 hover:bg-brand-ice/5 transition-colors cursor-pointer"
                  onClick={() => setPanelStudent(student)}
                >
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-sm text-brand-black">{student.name}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border" style={{ backgroundColor: student.beltColor, borderColor: student.beltColor }} />
                      <span className="font-mono text-xs text-brand-muted">{student.belt}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {student.monthsPending > 0 ? (
                      <span className="inline-block font-mono text-[0.6rem] font-bold tracking-wider uppercase px-2.5 py-1 border border-[#E8445A] text-[#E8445A] bg-[#E8445A10]">
                        {student.monthsPending} month{student.monthsPending > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-brand-muted">0</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={student.currentMonthStatus} />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-sm text-brand-muted">
                    {student.lastPaid}
                  </td>
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    {student.currentMonthStatus === FEE_STATUS.AWAITING ? (
                      <button
                        onClick={() => setVerifyStudent(student)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#7C5CBF] text-[#7C5CBF]
                                   font-mono text-[0.6rem] font-bold uppercase tracking-wider bg-transparent cursor-pointer
                                   hover:bg-[#7C5CBF] hover:text-brand-white transition-all"
                      >
                        <ShieldCheck size={12} /> Verify
                      </button>
                    ) : student.currentMonthStatus === FEE_STATUS.PENDING || student.currentMonthStatus === FEE_STATUS.OVERDUE ? (
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#F5A623] text-[#F5A623]
                                   font-mono text-[0.6rem] font-bold uppercase tracking-wider bg-transparent cursor-pointer
                                   hover:bg-[#F5A623] hover:text-brand-white transition-all"
                      >
                        <Bell size={12} /> Remind
                      </button>
                    ) : (
                      <button
                        onClick={() => setPanelStudent(student)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-brand-black text-brand-black
                                   font-mono text-[0.6rem] font-bold uppercase tracking-wider bg-transparent cursor-pointer
                                   hover:bg-brand-black hover:text-brand-white transition-all"
                      >
                        <Eye size={12} /> View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center font-mono text-sm text-brand-muted">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verify Modal */}
      {verifyStudent && (
        <VerifyPaymentModal
          student={verifyStudent}
          onClose={() => setVerifyStudent(null)}
          onConfirm={handleConfirm}
          onReject={handleReject}
        />
      )}

      {/* Side Panel */}
      {panelStudent && (
        <StudentFeePanel
          student={panelStudent}
          onClose={() => setPanelStudent(null)}
          onMarkPaid={handleMarkPaid}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
