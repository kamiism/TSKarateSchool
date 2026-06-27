import { useState } from 'react';
import { X, CheckCircle, XCircle, Image } from 'lucide-react';

export default function VerifyPaymentModal({ student, onClose, onConfirm, onReject }) {
  const [adminNote, setAdminNote] = useState('');

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-brand-white border-3 border-brand-black w-[min(520px,92%)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-brand-black">
          <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase">Verify Payment</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-brand-black flex items-center justify-center cursor-pointer bg-transparent
                       hover:bg-brand-black hover:text-brand-white transition-colors"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Student Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-brand-ice/30">
            <div className="w-10 h-10 border-2 border-brand-black bg-brand-purple flex items-center justify-center
                            font-mono text-sm font-bold text-brand-white uppercase">
              {student.name.charAt(0)}
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-brand-black block">{student.name}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-4 h-2 border" style={{ backgroundColor: student.beltColor, borderColor: student.beltColor }} />
                <span className="font-mono text-xs text-brand-muted">{student.belt}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">Claiming payment for</span>
              <span className="font-mono text-sm font-bold">June 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">Amount</span>
              <span className="font-mono text-sm font-bold">₹{student.feeAmount?.toLocaleString('en-IN') || '1,500'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">Reference ID</span>
              <span className="font-mono text-sm font-bold tracking-wider">{student.refId || '—'}</span>
            </div>
          </div>

          {/* Screenshot */}
          {student.screenshot && (
            <div>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Screenshot</span>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-brand-black bg-transparent
                                 font-mono text-xs uppercase tracking-wider cursor-pointer hover:bg-brand-ice/10 transition-colors">
                <Image size={14} /> View Uploaded Image
              </button>
            </div>
          )}

          {/* Admin Note */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Admin Note (optional)
            </label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border-2 border-brand-black bg-brand-white font-mono text-sm resize-none
                         focus:outline-none focus:shadow-brutal transition-all"
              placeholder="Add a note..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t-2 border-brand-black">
          <button
            onClick={() => onReject(student.id, adminNote)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-[#E8445A] bg-transparent
                       text-[#E8445A] font-mono text-[0.7rem] font-bold uppercase tracking-wider cursor-pointer
                       hover:bg-[#E8445A] hover:text-brand-white transition-all"
          >
            <XCircle size={14} /> Reject
          </button>
          <button
            onClick={() => onConfirm(student.id, adminNote)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-[#1DB97A] bg-[#1DB97A]
                       text-brand-white font-mono text-[0.7rem] font-bold uppercase tracking-wider cursor-pointer
                       hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#0a0a0a] transition-all"
          >
            <CheckCircle size={14} /> Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
