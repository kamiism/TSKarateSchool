import { useState } from 'react';
import { X, Check, AlertTriangle, Clock, Minus } from 'lucide-react';
import { FEE_STATUS, STATUS_COLORS } from '../../data/feeData';

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function StatusBadge({ status }) {
  if (!status) return <span className="font-mono text-xs text-brand-muted">—</span>;
  const color = STATUS_COLORS[status] || '#5D5D81';
  return (
    <span
      className="inline-block font-mono text-[0.6rem] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border whitespace-nowrap"
      style={{ color, borderColor: color, backgroundColor: `${color}15` }}
    >
      {status}
    </span>
  );
}

function getStripColor(status) {
  if (!status) return { bg: '#1a1a1a', border: '#333' }; // future — dark gray
  const map = {
    [FEE_STATUS.PAID]: { bg: '#1DB97A20', border: '#1DB97A' },
    [FEE_STATUS.PENDING]: { bg: '#F5A62320', border: '#F5A623' },
    [FEE_STATUS.OVERDUE]: { bg: '#E8445A20', border: '#E8445A' },
    [FEE_STATUS.AWAITING]: { bg: '#7C5CBF20', border: '#7C5CBF' },
  };
  return map[status] || { bg: '#1a1a1a', border: '#333' };
}

function getStripIcon(status) {
  if (!status) return <Minus size={10} className="text-brand-muted" />;
  if (status === FEE_STATUS.PAID) return <Check size={12} strokeWidth={3} color="#1DB97A" />;
  if (status === FEE_STATUS.OVERDUE || status === FEE_STATUS.PENDING) return <AlertTriangle size={11} strokeWidth={2.5} color="#E8445A" />;
  if (status === FEE_STATUS.AWAITING) return <Clock size={11} strokeWidth={2.5} color="#7C5CBF" />;
  return <Minus size={10} className="text-brand-muted" />;
}

export default function StudentFeePanel({ student, onClose, onMarkPaid }) {
  const [showManualPay, setShowManualPay] = useState(false);
  const [manualMonth, setManualMonth] = useState('');
  const [manualNote, setManualNote] = useState('');

  if (!student) return null;

  const handleManualPay = () => {
    if (!manualMonth) return;
    onMarkPaid(student.id, manualMonth, manualNote);
    setShowManualPay(false);
    setManualMonth('');
    setManualNote('');
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-brand-black/50 z-[8000]" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-screen w-[min(420px,100vw)] bg-brand-white border-l-3 border-brand-black z-[8001]
                      overflow-y-auto animate-[slideIn_0.3s_ease]">
        {/* Header */}
        <div className="sticky top-0 bg-brand-white z-10 px-6 py-5 border-b-2 border-brand-black flex items-center justify-between">
          <div>
            <h3 className="font-mono text-sm font-bold tracking-[0.1em] uppercase">{student.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-2 border" style={{ backgroundColor: student.beltColor, borderColor: student.beltColor }} />
              <span className="font-mono text-xs text-brand-muted">{student.belt}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-brand-black flex items-center justify-center cursor-pointer bg-transparent
                       hover:bg-brand-black hover:text-brand-white transition-colors"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        <div className="px-6 py-6">
          {/* 12-Month Strip */}
          <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-3">
            Fee History — 2026
          </span>
          <div className="grid grid-cols-12 gap-1 mb-8">
            {student.history.map((h, i) => {
              const colors = getStripColor(h.status);
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1"
                  title={`${MONTH_ABBR[i]}: ${h.status || 'Future'}`}
                >
                  <div
                    className="w-full aspect-square flex items-center justify-center border"
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                  >
                    {getStripIcon(h.status)}
                  </div>
                  <span className="font-mono text-[0.5rem] text-brand-muted">{MONTH_ABBR[i]}</span>
                </div>
              );
            })}
          </div>

          {/* Full History Table */}
          <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-3">
            Detailed History
          </span>
          <div className="border-2 border-brand-black overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-black bg-brand-ice/10">
                  <th className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-brand-muted text-left py-2.5 px-3">Month</th>
                  <th className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-brand-muted text-left py-2.5 px-3">Amt</th>
                  <th className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-brand-muted text-left py-2.5 px-3">Status</th>
                  <th className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-brand-muted text-left py-2.5 px-3">Paid</th>
                </tr>
              </thead>
              <tbody>
                {student.history.filter(h => h.status).map((h, i) => {
                  const isOverdue = h.status === FEE_STATUS.OVERDUE || h.status === FEE_STATUS.PENDING;
                  return (
                    <tr
                      key={i}
                      className={`border-b border-brand-ice/20 ${isOverdue ? 'bg-[#E8445A08]' : ''}`}
                    >
                      <td className="py-2.5 px-3 font-mono text-xs">{h.month}</td>
                      <td className="py-2.5 px-3 font-mono text-xs">₹{(h.amount || 1500).toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3"><StatusBadge status={h.status} /></td>
                      <td className="py-2.5 px-3 font-mono text-xs text-brand-muted">{h.paidOn || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mark as Paid Manually */}
          {!showManualPay ? (
            <button
              onClick={() => setShowManualPay(true)}
              className="w-full px-4 py-2.5 border-2 border-brand-black bg-transparent font-mono text-[0.7rem] font-bold
                         uppercase tracking-wider cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5
                         hover:shadow-brutal transition-all"
            >
              Mark as Paid Manually
            </button>
          ) : (
            <div className="border-2 border-brand-black p-4 space-y-3">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block">
                Manual Payment Override
              </span>
              <select
                value={manualMonth}
                onChange={(e) => setManualMonth(e.target.value)}
                className="w-full px-3 py-2 border-2 border-brand-black font-mono text-sm bg-brand-white cursor-pointer"
              >
                <option value="">Select month...</option>
                {student.history
                  .filter(h => h.status && h.status !== FEE_STATUS.PAID)
                  .map((h) => (
                    <option key={h.month} value={h.month}>{h.month} 2026</option>
                  ))
                }
              </select>
              <textarea
                value={manualNote}
                onChange={(e) => setManualNote(e.target.value)}
                rows={2}
                placeholder="Admin note..."
                className="w-full px-3 py-2 border-2 border-brand-black font-mono text-sm resize-none bg-brand-white focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowManualPay(false)}
                  className="flex-1 px-3 py-2 border-2 border-brand-black bg-transparent font-mono text-[0.65rem] font-bold
                             uppercase tracking-wider cursor-pointer hover:bg-brand-ice/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleManualPay}
                  disabled={!manualMonth}
                  className="flex-1 px-3 py-2 border-2 border-brand-black bg-brand-black text-brand-white font-mono text-[0.65rem]
                             font-bold uppercase tracking-wider cursor-pointer hover:shadow-brutal transition-all
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
