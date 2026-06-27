import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FEE_STATUS, STATUS_COLORS, studentFeeHistory } from '../../data/feeData';
import { IndianRupee, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

function StatusBadge({ status }) {
  if (!status) return <span className="font-mono text-xs text-brand-muted">—</span>;
  const color = STATUS_COLORS[status] || '#5D5D81';
  return (
    <span
      className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 border"
      style={{ color, borderColor: color, backgroundColor: `${color}15` }}
    >
      {status}
    </span>
  );
}

export default function FeesDashboard({ student }) {
  const sectionRef = useScrollReveal();

  // Derive current month data
  const now = new Date();
  const currentMonthName = now.toLocaleString('en-IN', { month: 'long' });
  const currentYear = now.getFullYear();

  const currentMonthFee = studentFeeHistory.find(
    (f) => f.month === currentMonthName && f.year === currentYear
  ) || studentFeeHistory[5]; // fallback to June

  // Pending dues
  const pendingMonths = studentFeeHistory.filter(
    (f) => f.status === FEE_STATUS.PENDING || f.status === FEE_STATUS.OVERDUE
  );
  const totalPending = pendingMonths.reduce((sum, f) => sum + f.amount, 0);

  // Last payment
  const paidEntries = studentFeeHistory.filter((f) => f.status === FEE_STATUS.PAID);
  const lastPayment = paidEntries[paidEntries.length - 1];

  return (
    <section id="fees-dashboard" className="py-16 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        {/* Page Header */}
        <div className="reveal mb-10">
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Pay Your Fees
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="font-mono text-lg text-brand-muted">{student.name}</span>
            <span
              className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 border"
              style={{
                color: student.beltColor,
                borderColor: student.beltColor,
                backgroundColor: `${student.beltColor}15`,
              }}
            >
              {student.belt}
            </span>
          </div>
        </div>

        {/* 3 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 — Current Month */}
          <div className="reveal reveal-delay-1 border-3 border-brand-black p-6 bg-brand-white
                          transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal">
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted">
                Current Month Fee
              </span>
              <IndianRupee size={18} strokeWidth={2.5} className="text-brand-purple" />
            </div>
            <span className="font-mono text-sm text-brand-muted block mb-1">
              {currentMonthFee.month} {currentMonthFee.year}
            </span>
            <span className="font-mono text-4xl font-bold text-brand-black block mb-3">
              ₹{currentMonthFee.amount.toLocaleString('en-IN')}
            </span>
            <StatusBadge status={currentMonthFee.status} />
            <span className="font-mono text-xs text-brand-muted block mt-3">
              Due by: 10th {currentMonthFee.month}
            </span>
          </div>

          {/* Card 2 — Pending Dues */}
          <div
            className={`reveal reveal-delay-2 border-3 border-brand-black p-6 transition-all duration-200
                        hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal
                        ${pendingMonths.length > 0 ? 'bg-[#E8445A08]' : 'bg-brand-white'}`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted">
                Pending Dues
              </span>
              <AlertTriangle
                size={18}
                strokeWidth={2.5}
                className={pendingMonths.length > 0 ? 'text-[#E8445A]' : 'text-brand-purple'}
              />
            </div>
            <span className="font-mono text-4xl font-bold text-brand-black block mb-2">
              ₹{totalPending.toLocaleString('en-IN')}
            </span>
            {pendingMonths.length > 0 ? (
              <span className="font-mono text-sm font-bold text-[#E8445A]">
                {pendingMonths.length} month(s) overdue
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-sm font-bold text-[#1DB97A]">
                <CheckCircle size={14} strokeWidth={3} /> All Clear
              </span>
            )}
          </div>

          {/* Card 3 — Last Payment */}
          <div className="reveal reveal-delay-3 border-3 border-brand-black p-6 bg-brand-black text-brand-white
                          transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal-purple">
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-ice">
                Last Payment
              </span>
              <Clock size={18} strokeWidth={2.5} className="text-brand-ice" />
            </div>
            {lastPayment ? (
              <>
                <span className="font-mono text-sm text-brand-muted block mb-1">
                  {lastPayment.month} {lastPayment.year}
                </span>
                <span className="font-mono text-4xl font-bold text-brand-white block mb-2">
                  ₹{lastPayment.amount.toLocaleString('en-IN')}
                </span>
                <span className="font-mono text-xs text-brand-muted block mb-3">
                  Ref: {lastPayment.refId}
                </span>
                <StatusBadge status={FEE_STATUS.PAID} />
              </>
            ) : (
              <span className="font-mono text-sm text-brand-muted">No payments yet</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
