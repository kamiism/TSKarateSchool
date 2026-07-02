import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FEE_STATUS, STATUS_COLORS, studentFeeHistory, defaultFeeSettings, studentExamFees } from '../../data/feeData';
import { QrCode, ArrowRight, FileText } from 'lucide-react';
import PaymentConfirmModal from './PaymentConfirmModal';
import FeeQueryModal from './FeeQueryModal';
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

export default function FeePaySection() {
  const sectionRef = useScrollReveal();
  const [showModal, setShowModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [feeHistory, setFeeHistory] = useState(studentFeeHistory);
  const [examFees, setExamFees] = useState(studentExamFees);
  const [toast, setToast] = useState(null);

  const pendingMonths = feeHistory.filter(
    (f) => f.status === FEE_STATUS.PENDING || f.status === FEE_STATUS.OVERDUE
  );
  const activeExamFees = examFees.filter((f) => f.status === FEE_STATUS.PENDING || f.status === FEE_STATUS.AWAITING);
  const totalDue = pendingMonths.reduce((sum, f) => sum + f.amount, 0);

  const handleExamPayment = (examId) => {
    setExamFees((prev) =>
      prev.map((f) =>
        f.id === examId ? { ...f, status: FEE_STATUS.AWAITING, refId: `TXN${Math.floor(Math.random()*10000000)}` } : f
      )
    );
    setToast('Exam fee payment submitted. Awaiting admin verification.');
  };

  const handlePaymentSubmit = ({ months, refId }) => {
    setFeeHistory((prev) =>
      prev.map((f) =>
        months.includes(f.month)
          ? { ...f, status: FEE_STATUS.AWAITING, refId }
          : f
      )
    );
    setShowModal(false);
    setToast('Payment submitted. Awaiting admin verification.');
  };

  const handleQuerySubmit = (queryDetails) => {
    // In a real app, send queryDetails to API
    setShowQueryModal(false);
    setToast('Query submitted successfully. We will get back to you soon.');
  };

  // Only show months up to current (June = index 5 for display)
  const visibleHistory = feeHistory.filter((f) => f.status !== null);

  return (
    <>
      <section id="fee-pay" className="py-16 bg-brand-black text-brand-white" ref={sectionRef}>
        <div className="w-[min(1200px,92%)] mx-auto">
          {/* Pay Cards Grid */}
          <div className={`grid grid-cols-1 ${activeExamFees.length > 0 ? 'md:grid-cols-2 gap-8' : ''} mb-16`}>
            {/* Pay Now Card - Monthly */}
            <div className={`reveal border-2 border-brand-ice/20 p-8 ${activeExamFees.length === 0 ? 'max-w-[520px] mx-auto' : ''}`}>
              <div className="flex items-center gap-2 mb-6">
                <QrCode size={20} strokeWidth={2.5} className="text-brand-ice" />
                <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-brand-white">
                  Monthly Fee Pay
                </h3>
              </div>

              <div className="mb-6">
                <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-1">
                  Amount Due
                </span>
                <span className="font-mono text-3xl font-bold text-brand-white">
                  ₹{totalDue > 0 ? totalDue.toLocaleString('en-IN') : defaultFeeSettings.monthlyFee.toLocaleString('en-IN')}
                </span>
                {pendingMonths.length > 0 && (
                  <span className="font-mono text-xs text-brand-muted block mt-1">
                    (includes {pendingMonths.length} pending month(s))
                  </span>
                )}
              </div>

              {/* QR Placeholder */}
              <div className="w-full aspect-square max-w-[200px] mx-auto border-2 border-brand-ice/20 bg-brand-white
                              flex flex-col items-center justify-center mb-6">
                <QrCode size={60} strokeWidth={1} className="text-brand-black mb-3" />
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-brand-muted">
                  QR Code
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">UPI ID:</span>
                  <span className="font-mono text-sm text-brand-white">{defaultFeeSettings.upiId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">Name:</span>
                  <span className="font-mono text-sm text-brand-white">{defaultFeeSettings.upiName}</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-ice
                           bg-transparent text-brand-ice font-mono text-[0.75rem] font-bold uppercase tracking-wider
                           cursor-pointer transition-all duration-150
                           hover:bg-brand-ice hover:text-brand-black
                           active:translate-x-0.5 active:translate-y-0.5 mb-4"
              >
                I Have Paid <ArrowRight size={14} strokeWidth={3} />
              </button>

              <div className="flex justify-center">
                 <button
                    onClick={() => setShowQueryModal(true)}
                    className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-brand-muted hover:text-brand-white transition-colors cursor-pointer bg-transparent border-none"
                 >
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">?</span>
                    Report an Issue / Raise Query
                 </button>
              </div>
            </div>

            {/* Exam Fee Card */}
            {activeExamFees.length > 0 && (
              <div className="reveal reveal-delay-1 border-2 border-brand-black p-8 bg-brand-white text-brand-black">
                <div className="flex items-center gap-2 mb-6">
                  <FileText size={20} strokeWidth={2.5} className="text-brand-purple" />
                  <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-brand-black">
                    Exam Fee
                  </h3>
                </div>

                {activeExamFees.map((exam) => (
                  <div key={exam.id} className="mb-6 pb-6 border-b-2 border-brand-ice/40 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">
                        {exam.examDate}
                      </span>
                      <StatusBadge status={exam.status} />
                    </div>
                    <span className="font-bold text-lg block mb-2">{exam.title}</span>
                    <span className="font-mono text-3xl font-bold text-brand-black block mb-4">
                      ₹{exam.amount.toLocaleString('en-IN')}
                    </span>
                    {exam.status === FEE_STATUS.AWAITING ? (
                      <button
                        disabled
                        className="w-full flex items-center justify-center px-6 py-3 border-2 border-[#7C5CBF]
                                   bg-[#7C5CBF]/10 text-[#7C5CBF] font-mono text-[0.75rem] font-bold uppercase tracking-wider
                                   cursor-default"
                      >
                        Awaiting Verification
                      </button>
                    ) : (
                      <button
                        onClick={() => handleExamPayment(exam.id)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-black
                                   bg-brand-black text-brand-white font-mono text-[0.75rem] font-bold uppercase tracking-wider
                                   cursor-pointer transition-all duration-150
                                   hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal
                                   active:translate-x-0 active:translate-y-0 active:shadow-none"
                      >
                        Pay Exam Fee <ArrowRight size={14} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment History */}
          <div className="reveal reveal-delay-1">
            <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-brand-white mb-6">
              Payment History
            </h3>

            <div className="border-2 border-brand-ice/20 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-brand-ice/20">
                    <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Month</th>
                    <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Amount</th>
                    <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Status</th>
                    <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Paid On</th>
                    <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Ref ID</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleHistory.map((entry) => {
                    const isOverdue = entry.status === FEE_STATUS.OVERDUE || entry.status === FEE_STATUS.PENDING;
                    return (
                      <tr
                        key={entry.month}
                        className={`border-b border-brand-ice/10 transition-colors duration-200
                                   ${isOverdue ? 'bg-[#E8445A]/5' : 'hover:bg-brand-white/5'}`}
                      >
                        <td className="py-3.5 px-4 font-mono text-sm text-brand-white">
                          {entry.month} {entry.year}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-sm text-brand-white">
                          ₹{entry.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={entry.status} />
                        </td>
                        <td className="py-3.5 px-4 font-mono text-sm text-brand-muted">
                          {entry.paidOn || '—'}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-brand-muted tracking-wider">
                          {entry.refId || '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </section>

      {/* Payment Modal */}
      {showModal && (
        <PaymentConfirmModal
          onClose={() => setShowModal(false)}
          onSubmit={handlePaymentSubmit}
          pendingMonths={pendingMonths}
        />
      )}

      {/* Query Modal */}
      {showQueryModal && (
        <FeeQueryModal
          onClose={() => setShowQueryModal(false)}
          onSubmit={handleQuerySubmit}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
